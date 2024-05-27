import sys
import pandas as pd
from io import StringIO

def main():
    if len(sys.argv) < 2:
        print("Por favor, proporciona la ruta a los archivos .csv")
        return

    # Cogemos la ruta pasada por parámetros 
    path_to_files = sys.argv[1]

    # Construir rutas completas a los archivos
    files_info = {
        'users': 'userInfo.csv',
        'categories': 'categoryInfo.csv',
        'incidents': 'incidentsInfo.csv'
    }

    # Buffer para mantener el contenido CSV
    csv_buffer = StringIO()

    try:    
        for key, filename in files_info.items():
            # Leemos los archivos
            df = pd.read_csv(path_to_files + filename)
            # Escribir el título de la sección (Siendo los tipos de colecciones Usuarios, Categorias e Incidencias)
            csv_buffer.write(key.upper() + '\n')
            # Escribir los datos
            df.to_csv(csv_buffer, index=False)
            # Añadir una línea en blanco entre secciones
            csv_buffer.write('\n')

        # Escribir todo al archivo final en la ruta dónde se encuentran los archivos
        with open(path_to_files + 'combined_data.csv', 'w', encoding='utf-8') as f:
            f.write(csv_buffer.getvalue())

    except Exception as e:
        print(f"Error al procesar los archivos CSV: {e}")

if __name__ == "__main__":
    main()