import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  addDoc,
  collection,
  updateDoc,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  Unsubscribe,
  DocumentData,
  deleteDoc,
  Firestore,
  DocumentReference,
  DocumentSnapshot,
  FieldPath,
  CollectionReference,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  FirebaseStorage,
} from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInAnonymously,
  signOut,
  signInWithEmailAndPassword,
  initializeAuth,
  indexedDBLocalPersistence,
  UserCredential,
  Auth,
  User,
} from 'firebase/auth';
import { UserInfo } from '../../interfaces/user-info';

export interface FirebaseStorageFile {
  path: string;
  file: string;
}

export interface FirebaseDocument {
  id: string;
  data: DocumentData;
}

export interface FirebaseUserCredential {
  user: UserCredential;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _app!: FirebaseApp;
  private _db!: Firestore;
  private _auth!: Auth;
  private _webStorage!: FirebaseStorage;
  private _user: User | null = null;
  private _isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLogged$: Observable<boolean> = this._isLogged.asObservable();

  private _users: BehaviorSubject<UserInfo[]> = new BehaviorSubject<UserInfo[]>(
    []
  );
  public users$: Observable<UserInfo[]> = this._users.asObservable();
  private _incidents: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public incidents$: Observable<any[]> = this._incidents.asObservable();
  private _categories: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public categories$: Observable<any[]> = this._categories.asObservable();

  constructor(@Inject('firebase-config') config: any) {
    this.init(config);
  }

  /**
   * The `init` function initializes Firebase, sets up authentication, and subscribes to user and
   * incident collections based on the user's authentication state.
   *
   * @param firebaseConfig The `firebaseConfig` parameter is an object that contains the configuration
   * settings needed to initialize Firebase in your application. It typically includes properties such
   * as `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, and
   * `measurementId`. These settings are unique to
   */
  public async init(firebaseConfig: any) {
    // Initialize Firebase
    this._app = initializeApp(firebaseConfig);
    this._db = getFirestore(this._app);
    this._webStorage = getStorage(this._app);
    this._auth = initializeAuth(getApp(), {
      persistence: indexedDBLocalPersistence,
    });
    this._auth.onAuthStateChanged(async (user) => {
      this._user = user;
      if (user) {
        if (user.uid && user.email) {
          this._isLogged.next(true);
          this.subscribeToCollection('userInfo', this._users, (el: any) => el);
          this.subscribeToCollection(
            'categoryInfo',
            this._categories,
            (el: any) => el
          );
          this.subscribeToCollection(
            'incidentsInfo',
            this._incidents,
            (el: any) => el
          );
        }
      } else {
        this._isLogged.next(false);
      }
    });
  }

  public async getAllData(): Promise<{ [key: string]: any[] }> {
    const collections = ['userInfo', 'categoryInfo', 'incidentsInfo']; // Añade más nombres de colecciones si necesario
    const allData: { [key: string]: any[] } = {};
  
    try {
      for (const collectionName of collections) {
        const querySnapshot = await getDocs(collection(this._db, collectionName));
        allData[collectionName] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      }
      return allData;
    } catch (error: any) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  /**
   * The function `getUser` returns the user object or null.
   * @returns The `user` property is being returned, which is of type `User` or `null`.
   */
  public get user(): User | null {
    return this._user;
  }

  /**
   * The function `fileUpload` uploads a file to Firebase Storage with specified metadata and returns a
   * Promise containing the path and download URL of the uploaded file.
   * @param {Blob} blob - The `blob` parameter in the `fileUpload` function is a Blob object
   * representing the data to be uploaded to Firebase Storage. Blobs represent raw data that can be of
   * any type, such as images, documents, or other binary data.
   * @param {string} mimeType - The `mimeType` parameter in the `fileUpload` function refers to the
   * type of the file being uploaded. It specifies the media type of the file, such as "image/jpeg" for
   * JPEG images or "application/pdf" for PDF files. This information is important for setting the
   * content type metadata
   * @param {string} path - The `path` parameter in the `fileUpload` function represents the location
   * in the Firebase Storage where you want to upload the file. It is a string that specifies the path
   * or directory within your Firebase Storage bucket where the file will be stored. For example, if
   * you want to upload the file to
   * @param {string} prefix - The `prefix` parameter in the `fileUpload` function is a string that is
   * used as a prefix for the file name when it is uploaded to Firebase Storage. It is concatenated
   * with the current timestamp and the specified extension to form the final file name.
   * @param {string} extension - The `extension` parameter in the `fileUpload` function represents the
   * file extension of the uploaded file. This could be something like ".jpg", ".png", ".pdf", etc.,
   * depending on the type of file being uploaded. It is used to construct the final URL of the file in
   * the storage
   * @returns The function `fileUpload` returns a Promise that resolves to a `FirebaseStorageFile`
   * object, which contains the `path` and `file` properties.
   */
  public fileUpload(
    blob: Blob,
    mimeType: string,
    path: string,
    prefix: string,
    extension: string
  ): Promise<FirebaseStorageFile> {
    return new Promise(async (resolve, reject) => {
      if (!this._webStorage || !this._auth)
        reject({
          msg: 'Not connected to FireStorage',
        });
      var freeConnection = false;
      if (this._auth && !this._auth.currentUser) {
        try {
          await signInAnonymously(this._auth);
          freeConnection = true;
        } catch (error) {
          reject(error);
        }
      }
      const url = path + '/' + prefix + '-' + Date.now() + extension;
      const storageRef = ref(this._webStorage!, url);
      const metadata = {
        contentType: mimeType,
      };
      uploadBytes(storageRef, blob)
        .then(async (snapshot) => {
          getDownloadURL(storageRef)
            .then(async (downloadURL) => {
              if (freeConnection) await signOut(this._auth!);
              resolve({
                path,
                file: downloadURL,
              });
            })
            .catch(async (error) => {
              if (freeConnection) await signOut(this._auth!);
              reject(error);
            });
        })
        .catch(async (error) => {
          if (freeConnection) await signOut(this._auth!);
          reject(error);
        });
    });
  }

  /**
   * The function `imageUpload` uploads a blob as an image file with the specified parameters.
   * @param {Blob} blob - The `blob` parameter in the `imageUpload` function is a Blob object
   * representing the image file that you want to upload. It contains the binary data of the image
   * file.
   * @returns The `imageUpload` function is returning a Promise that resolves to the result of calling
   * the `fileUpload` function with the provided parameters: `blob`, `'image/jpeg'`, `'images'`,
   * `'image'`, and `".jpg"`.
   */
  public imageUpload(blob: Blob): Promise<any> {
    return this.fileUpload(blob, 'image/jpeg', 'images', 'image', '.jpg');
  }

  /**
   * The function `createDocument` creates a document in a specified collection in a database and
   * returns a Promise with the document ID.
   * @param {string} collectionName - The `collectionName` parameter is a string that represents the
   * name of the collection in the database where you want to create a new document.
   * @param {any} data - The `data` parameter in the `createDocument` function represents the
   * information or document that you want to add to the specified collection in the database. It can
   * be of any type (`any` in this case), allowing you to pass different kinds of data to be stored in
   * the database. This data
   * @returns The `createDocument` function returns a `Promise` that resolves to a string, which is the
   * ID of the newly created document in the specified collection.
   */
  public createDocument(collectionName: string, data: any): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this._db)
        reject({
          msg: 'Database is not connected',
        });
      const collectionRef = collection(this._db!, collectionName);
      addDoc(collectionRef, data)
        .then((docRef) => resolve(docRef.id))
        .catch((err) => reject(err));
    });
  }

  /**
   * The function `createDocumentWithId` creates a document with a specific ID in a specified
   * collection in a Firestore database.
   * @param {string} collectionName - The `collectionName` parameter is a string that represents the
   * name of the collection in which you want to create a new document.
   * @param {any} data - The `data` parameter in the `createDocumentWithId` function represents the
   * information or document that you want to store in the specified collection with the provided
   * document ID. It can be any type of data that you want to save in the Firestore database, such as
   * an object, string, number,
   * @param {string} docId - The `docId` parameter in the `createDocumentWithId` function is a string
   * that represents the unique identifier or name of the document you want to create in the specified
   * collection. It is used to uniquely identify the document within the collection.
   * @returns A Promise is being returned.
   */
  public createDocumentWithId(
    collectionName: string,
    data: any,
    docId: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._db) {
        reject({
          msg: 'Database is not connected',
        });
      }
      const docRef = doc(this._db!, collectionName, docId);
      setDoc(docRef, data)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  /**
   * This TypeScript function updates a document in a specified collection with the provided data.
   * @param {string} collectionName - The `collectionName` parameter is a string that represents the
   * name of the collection in the database where the document will be updated.
   * @param {string} document - The `document` parameter in the `updateDocument` function refers to the
   * specific document within the collection that you want to update. It is typically identified by a
   * unique document ID or name within the specified collection.
   * @param {any} data - The `data` parameter in the `updateDocument` function represents the new data
   * that you want to update in the specified document within the collection. This data can be of any
   * type (`any` in this case) and should contain the updated values that you want to set in the
   * document.
   * @returns This function returns a Promise that resolves to void.
   */
  public updateDocument(
    collectionName: string,
    document: string,
    data: any
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this._db)
        reject({
          msg: 'Database is not connected',
        });
      const collectionRef = collection(this._db!, collectionName);
      updateDoc(doc(collectionRef, document), data)
        .then((docRef) => resolve())
        .catch((err) => reject(err));
    });
  }

  /**
   * This function retrieves documents from a specified collection in Firebase and returns them as an
   * array of FirebaseDocument objects.
   * @param {string} collectionName - The `collectionName` parameter is a string that represents the
   * name of the collection in the Firebase Firestore database from which you want to retrieve
   * documents.
   * @returns A Promise that resolves to an array of FirebaseDocument objects. Each FirebaseDocument
   * object contains an id property representing the document ID and a data property representing the
   * document data.
   */
  public getDocuments(collectionName: string): Promise<FirebaseDocument[]> {
    return new Promise(async (resolve, reject) => {
      if (!this._db)
        reject({
          msg: 'Database is not connected',
        });
      const querySnapshot = await getDocs(
        collection(this._db!, collectionName)
      );
      resolve(
        querySnapshot.docs.map<FirebaseDocument>((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
    });
  }

  /**
   * This TypeScript function retrieves documents from a Firebase collection based on a substring match
   * in the document IDs.
   * @param {string} collectionName - The `collectionName` parameter refers to the name of the
   * collection in the Firebase Firestore database from which you want to retrieve documents. It is a
   * string that specifies the collection's name.
   * @param {string} substring - The `substring` parameter in the `getDocumentsBySubstring` function is
   * a string that represents the substring you want to search for within the document IDs in a
   * specific collection. The function will return a Promise that resolves to an array of Firebase
   * documents whose IDs contain the specified substring.
   * @returns This function `getDocumentsBySubstring` returns a Promise that resolves to an array of
   * `FirebaseDocument` objects. The `FirebaseDocument` objects contain the `id` and `data` properties
   * of the documents that match the provided `substring` within the specified `collectionName`. If no
   * documents match the criteria, an empty array is returned.
   */
  public getDocumentsBySubstring(
    collectionName: string,
    substring: string
  ): Promise<FirebaseDocument[]> {
    return new Promise(async (resolve, reject) => {
      if (!this._db) {
        reject({
          msg: 'Database is not connected',
        });
      }
      try {
        const allDocs = await getDocs(collection(this._db!, collectionName));

        const filteredDocs = allDocs.docs.filter((doc) =>
          doc.id.includes(substring)
        );

        if (filteredDocs && filteredDocs.length > 0) {
          resolve(
            filteredDocs.map<FirebaseDocument>((doc) => {
              return { id: doc.id, data: doc.data() };
            })
          );
        } else {
          // No se encontraron documentos que coincidan con el criterio de búsqueda
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * This TypeScript function retrieves a document from a Firebase collection and returns a Promise
   * with the document data if it exists.
   * @param {string} collectionName - The `collectionName` parameter in the `getDocument` function
   * refers to the name of the collection in the Firestore database from which you want to retrieve a
   * specific document. It is a string value that specifies the collection where the document is
   * stored.
   * @param {string} document - The `document` parameter in the `getDocument` function represents the
   * specific document ID that you want to retrieve from the specified collection in the Firestore
   * database. It is used to identify the document within the collection and fetch its data.
   * @returns A Promise is being returned, which resolves to a FirebaseDocument object if the document
   * exists in the specified collection, and rejects with an error message if the database is not
   * connected or if the document does not exist.
   */
  public getDocument(
    collectionName: string,
    document: string
  ): Promise<FirebaseDocument> {
    return new Promise(async (resolve, reject) => {
      if (!this._db)
        reject({
          msg: 'Database is not connected',
        });
      const docRef = doc(this._db!, collectionName, document);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resolve({ id: docSnap.id, data: docSnap.data() });
      } else {
        // doc.data() will be undefined in this case
        reject('document does not exists');
      }
    });
  }

  /**
   * This TypeScript function retrieves documents from a Firestore collection based on a specified
   * field and value.
   * @param {string} collectionName - The `collectionName` parameter refers to the name of the
   * collection in your Firestore database from which you want to retrieve documents. It is a string
   * that specifies the collection's name.
   * @param {string} field - The `field` parameter in the `getDocumentsBy` function represents the
   * field in the Firestore collection that you want to query against. It is used to specify the field
   * on which you want to apply the equality condition in the query.
   * @param {any} value - The `value` parameter in the `getDocumentsBy` function represents the value
   * that you want to query for in the specified field of the documents in the collection. It is the
   * value that you are searching for in the database.
   * @returns The `getDocumentsBy` function returns a Promise that resolves to an array of
   * `FirebaseDocument` objects. Each `FirebaseDocument` object contains an `id` property representing
   * the document ID and a `data` property representing the document data.
   */
  public getDocumentsBy(
    collectionName: string,
    field: string,
    value: any
  ): Promise<FirebaseDocument[]> {
    return new Promise(async (resolve, reject) => {
      if (!this._db)
        reject({
          msg: 'Database is not connected',
        });
      const q = query(
        collection(this._db!, collectionName),
        where(field, '==', value)
      );

      const querySnapshot = await getDocs(q);
      resolve(
        querySnapshot.docs.map<FirebaseDocument>((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
    });
  }

  /**
   * The function `deleteDocument` deletes a document from a specified collection in a database and
   * returns a promise indicating the success status.
   * @param {string} collectionName - The `collectionName` parameter is a string that represents the
   * name of the collection from which you want to delete a document.
   * @param {string} docId - The `docId` parameter in the `deleteDocument` function represents the
   * unique identifier of the document that you want to delete from the specified collection in the
   * database. It is used to locate the specific document that needs to be removed.
   * @returns The `deleteDocument` function is returning a Promise that resolves to an object with a
   * `success` property set to a boolean value. The object structure being returned is `{ success:
   * boolean }`.
   */
  public deleteDocument(
    collectionName: string,
    docId: string
  ): Promise<{ success: boolean }> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this._db) {
          throw new Error('Database is not connected');
        }
        const docRef = doc(this._db, collectionName, docId);
        await deleteDoc(docRef);
        resolve({ success: true });
      } catch (error) {
        console.error('Error deleting document:', error);
        reject(error);
      }
    });
  }

  /**
   * The function `subscribeToCollection` subscribes to changes in a Firestore collection and updates a
   * BehaviorSubject with the mapped data.
   * @param {string} collectionName - The `collectionName` parameter is a string that represents the
   * name of the collection in the Firestore database that you want to subscribe to for real-time
   * updates.
   * @param subject - The `subject` parameter is a BehaviorSubject that emits an array of items.
   * @param mapFunction - The `mapFunction` parameter in the `subscribeToCollection` function is a
   * function that takes a `DocumentData` object as input and returns any other type of object. This
   * function is used to transform the data from the Firestore document into the desired format before
   * emitting it to the `subject`.
   * @returns The `subscribeToCollection` function returns either an `Unsubscribe` function or `null`.
   */
  public subscribeToCollection(
    collectionName: string,
    subject: BehaviorSubject<any[]>,
    mapFunction: (el: DocumentData) => any
  ): Unsubscribe | null {
    if (!this._db) return null;
    return onSnapshot(
      collection(this._db, collectionName),
      (snapshot) => {
        subject.next(snapshot.docs.map<any>((doc) => mapFunction(doc.data())));
      },
      (error) => {}
    );
  }

  /**
   * The function `subscribeToDocument` subscribes to changes in a Firestore document and updates a
   * BehaviorSubject with the mapped data.
   * @param {string} documentPath - The `documentPath` parameter is a string that represents the path
   * to a specific document in a Firestore database.
   * @param subject - The `subject` parameter is an instance of `BehaviorSubject<any>`, which is a type
   * of subject in RxJS that stores the most recent value emitted to its subscribers and emits that
   * value immediately to new subscribers.
   * @param mapFunction - The `mapFunction` parameter in the `subscribeToDocument` function is a
   * function that takes a `DocumentData` object as input and returns any other type of data. This
   * function is used to transform the raw data from the Firestore document into a format that can be
   * emitted by the `subject`
   * @returns The `subscribeToDocument` function returns either an `Unsubscribe` function or `null`.
   */
  public subscribeToDocument(
    documentPath: string,
    subject: BehaviorSubject<any>,
    mapFunction: (el: DocumentData) => any
  ): Unsubscribe | null {
    if (!this._db) {
      return null;
    }
    const documentRef: DocumentReference = doc(this._db, documentPath);

    return onSnapshot(
      documentRef,
      (snapshot: DocumentSnapshot) => {
        const data = snapshot.data();
        if (data) {
          subject.next(mapFunction(data));
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  /**
   * The `signOut` function in TypeScript signs out the user and optionally signs in anonymously.
   * @param {boolean} [signInAnon=false] - The `signInAnon` parameter is a boolean flag that indicates
   * whether the user should be signed in anonymously after signing out. If `signInAnon` is set to
   * `true`, the `connectAnonymously` method will be called after signing out.
   */
  public async signOut(signInAnon: boolean = false): Promise<void> {
    new Promise<void>(async (resolve, reject) => {
      if (this._auth)
        try {
          await this._auth.signOut();
          if (signInAnon) await this.connectAnonymously();
          resolve();
        } catch (error) {
          reject(error);
        }
    });
  }

  /**
   * The function `isUserConnected` returns a Promise that resolves to a boolean indicating whether a
   * user is currently connected.
   * @returns The `isUserConnected` function returns a Promise that resolves to a boolean value
   * indicating whether the user is connected or not.
   */
  public isUserConnected(): Promise<boolean> {
    const response = new Promise<boolean>(async (resolve, reject) => {
      if (!this._auth) resolve(false);
      resolve(this._auth!.currentUser != null);
    });
    return response;
  }

  /**
   * The function `isUserConnectedAnonymously` checks if the user is connected anonymously and returns
   * a Promise with a boolean value.
   * @returns A Promise that resolves to a boolean value indicating whether the user is connected
   * anonymously or not.
   */
  public isUserConnectedAnonymously(): Promise<boolean> {
    const response = new Promise<boolean>(async (resolve, reject) => {
      if (!this._auth) resolve(false);
      resolve(
        this._auth!.currentUser != null && this._auth!.currentUser.isAnonymous
      );
    });
    return response;
  }

  /**
   * The function `connectAnonymously` connects a user anonymously if not already connected.
   * @returns A Promise is being returned from the `connectAnonymously` function.
   */
  public async connectAnonymously(): Promise<void> {
    const response = new Promise<void>(async (resolve, reject) => {
      if (!this._auth) resolve();
      if (
        !(await this.isUserConnected()) &&
        !(await this.isUserConnectedAnonymously())
      ) {
        await signInAnonymously(this._auth!).catch((error) => reject(error));
        resolve();
      } else if (await this.isUserConnectedAnonymously()) resolve();
      else reject({ msg: 'An user is already connected' });
    });
    return response;
  }

  /**
   * This TypeScript function creates a user with email and password authentication, handling various
   * error cases.
   * @param {string} email - The `email` parameter in the `createUserWithEmailAndPassword` function is
   * a string that represents the email address of the user you want to create an account for. It is
   * used as a unique identifier for the user's account and must be in a valid email format (e.g.,
   * example@example.com).
   * @param {string} password - The `password` parameter in the `createUserWithEmailAndPassword`
   * function is a string that represents the password that the user wants to set for their account. It
   * is used to authenticate the user during the sign-up process and is typically required to meet
   * certain security criteria, such as having a minimum length, containing
   * @returns The `createUserWithEmailAndPassword` function is being called with the provided email and
   * password parameters. If successful, it returns a `FirebaseUserCredential` object containing
   * information about the user. If there is an error during the process, it logs specific error
   * messages based on the error code and then rejects the promise with the error.
   */
  public async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<FirebaseUserCredential | null> {
    return new Promise(async (resolve, reject) => {
      if (!this._auth) resolve(null);
      try {
        resolve({
          user: await createUserWithEmailAndPassword(
            this._auth!,
            email,
            password
          ),
        });
      } catch (error: any) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            console.log(`Email address ${email} already in use.`);
            break;
          case 'auth/invalid-email':
            console.log(`Email address ${email} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            console.log(`Error during sign up.`);
            break;
          case 'auth/weak-password':
            console.log(
              'Password is not strong enough. Add additional characters including special characters and numbers.'
            );
            break;
          default:
            console.log(error.message);
            break;
        }
        reject(error);
      }
    });
  }

  /**
   * The function `connectUserWithEmailAndPassword` attempts to sign in a user with the provided email
   * and password using Firebase authentication and returns a `FirebaseUserCredential` or `null` in a
   * Promise.
   * @param {string} email - The `email` parameter is a string that represents the user's email address
   * that they use to sign in.
   * @param {string} password - The `password` parameter in the `connectUserWithEmailAndPassword`
   * function is a string that represents the user's password for authentication.
   * @returns The `connectUserWithEmailAndPassword` function returns a Promise that resolves to a
   * `FirebaseUserCredential` object if the sign-in is successful, or `null` if the authentication
   * object `_auth` is not available. If there is an error during sign-in, the Promise will be rejected
   * with the error.
   */
  public async connectUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<FirebaseUserCredential | null> {
    return new Promise<FirebaseUserCredential | null>(
      async (resolve, reject) => {
        if (!this._auth) resolve(null);
        try {
          const user = await signInWithEmailAndPassword(
            this._auth,
            email,
            password
          );
          return { user };
        } catch (error) {
          reject(error);
          return error;
        }
      }
    );
  }

  /**
   * The function deleteUser deletes a user and returns a Promise that resolves when the user is
   * successfully deleted or rejects if there is no user to delete.
   * @returns The `deleteUser` method is returning a Promise that resolves with void.
   */
  public deleteUser(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this._user) reject();
      resolve(deleteUser(this._user!));
    });
  }

  /**
   * The function `updateDocumentField` updates a specific field with a new value in a document within
   * a Firestore collection.
   * @param {string} collectionName - The `collectionName` parameter refers to the name of the
   * collection in the Firestore database where the document is located.
   * @param {string} document - The `document` parameter in the `updateDocumentField` function
   * represents the unique identifier of the document within the specified collection that you want to
   * update. It is a string value that identifies the specific document you want to modify in the
   * Firestore database.
   * @param {string} fieldName - The `fieldName` parameter in the `updateDocumentField` function
   * represents the name of the field in the document that you want to update. For example, if you have
   * a document in a Firestore collection with fields like "name", "age", "email", etc., the
   * `fieldName` parameter would
   * @param {any} fieldValue - The `fieldValue` parameter in the `updateDocumentField` function
   * represents the new value that you want to set for the specified field (`fieldName`) in the
   * document identified by `document` within the collection `collectionName`. This value can be of any
   * data type (`string`, `number`, `
   * @returns This function `updateDocumentField` returns a Promise that resolves to void (undefined)
   * when the document field update operation is successful, or rejects with an error object if there
   * is an issue such as the database not being connected or an error during the update operation.
   */
  public updateDocumentField(
    collectionName: string,
    document: string,
    fieldName: string,
    fieldValue: any
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this._db) {
        reject({
          msg: 'Database is not connected',
        });
      }

      const documentRef = doc(this._db as Firestore, collectionName, document);
      const fieldUpdate = { [fieldName]: fieldValue }; // Crear un objeto con el campo a actualizar

      try {
        await updateDoc(documentRef, fieldUpdate);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
