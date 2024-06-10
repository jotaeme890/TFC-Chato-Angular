import pandas as pd
import sys

def combine_csv_files(path):
    # Rutas completas de los archivos
    user_info_path = f"{path}/userInfo.csv"
    category_info_path = f"{path}/categoryInfo.csv"
    incidents_info_path = f"{path}/incidentsInfo.csv"
    
    # Leer los archivos CSV
    user_info = pd.read_csv(user_info_path)
    category_info = pd.read_csv(category_info_path)
    incidents_info = pd.read_csv(incidents_info_path)
    
    # Combinar los archivos
    # Asumiendo que quieres unirlos horizontalmente (uno al lado del otro)
    combined_data = pd.concat([user_info, category_info, incidents_info], axis=1)
    
    # Guardar el archivo combinado en la misma ruta
    output_path = f"{path}/combined_data.csv"
    combined_data.to_csv(output_path, index=False)
    print(f"Archivo combinado creado: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Por favor, especifique la ruta del directorio donde están los archivos CSV.")
    else:
        combine_csv_files(sys.argv[1])