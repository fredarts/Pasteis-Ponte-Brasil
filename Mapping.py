import tkinter as tk
from tkinter import filedialog
import os
import datetime

# Define os tipos de arquivo permitidos
ALLOWED_EXTENSIONS = {'.html', '.css', '.js', '.json'}
# Define diretórios a serem ignorados (começando com .git)
IGNORE_DIRS = {'.git'}

def select_folder():
    """Abre uma janela para o usuário selecionar uma pasta."""
    root = tk.Tk()
    root.withdraw()
    folder_path = filedialog.askdirectory(title="Selecione a pasta para mapear")
    root.destroy()
    return folder_path

def generate_folder_tree(folder_path):
    """
    Gera uma representação em string da estrutura de árvore da pasta.
    Exclui diretórios especificados em IGNORE_DIRS (como .git).
    """
    tree_lines = []
    if not folder_path or not os.path.isdir(folder_path):
        print(f"Erro: Pasta base inválida ou não encontrada: {folder_path}")
        return "Pasta base inválida ou não encontrada."

    base_name = os.path.basename(folder_path)
    tree_lines.append(f"{base_name}/")
    start_depth = folder_path.rstrip(os.sep).count(os.sep)

    print(f"Gerando estrutura da árvore para: {folder_path}")
    # Usar topdown=True (padrão) para poder modificar 'dirs'
    for root, dirs, files in os.walk(folder_path, topdown=True):

        # --- INÍCIO DA MODIFICAÇÃO ---
        # Remove os diretórios ignorados da lista 'dirs' ANTES de processar
        # Isso impede que os.walk entre nesses diretórios
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        # Opcional: Informar quais diretórios estão sendo ignorados no nível atual
        # ignored_now = [d for d in os.listdir(root) if os.path.isdir(os.path.join(root, d)) and d in IGNORE_DIRS]
        # for ignored in ignored_now:
        #    print(f"  Ignorando diretório: {os.path.join(os.path.relpath(root, folder_path), ignored)}")
        # --- FIM DA MODIFICAÇÃO ---

        # Ordena diretórios e arquivos para uma saída consistente
        dirs.sort()
        files.sort()

        current_depth = root.rstrip(os.sep).count(os.sep)
        level = current_depth - start_depth
        indent = '    ' * (level + 1)

        # Adiciona os subdiretórios (que não foram ignorados)
        for d in dirs:
            tree_lines.append(f"{indent}{d}/")

        # Adiciona os arquivos
        for f in files:
            tree_lines.append(f"{indent}{f}")

    return '\n'.join(tree_lines)


def map_content_only(folder_path):
    """
    Mapeia e extrai APENAS o CONTEÚDO dos arquivos permitidos
    na pasta e subpastas. Exclui diretórios em IGNORE_DIRS.
    """
    all_content = ""
    header_separator = "=" * 80
    footer_separator = "-" * 80

    if not folder_path:
        print("Nenhuma pasta selecionada para extrair conteúdo.")
        return None

    print(f"Extraindo conteúdo dos arquivos permitidos em: {folder_path} (ignorando {IGNORE_DIRS})")

    for root, dirs, files in os.walk(folder_path, topdown=True):

        # --- INÍCIO DA MODIFICAÇÃO ---
        # Remove os diretórios ignorados da lista 'dirs' ANTES de processar
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        # --- FIM DA MODIFICAÇÃO ---

        files.sort()
        for file in files:
            file_path = os.path.join(root, file)
            # Não precisamos mais do relative_path aqui para o cabeçalho, mas mantemos por clareza
            relative_path = os.path.relpath(file_path, folder_path)
            _ , file_extension = os.path.splitext(file)
            file_extension_lower = file_extension.lower()

            if file_extension_lower in ALLOWED_EXTENSIONS:
                print(f"  Lendo conteúdo de: {relative_path}") # Usando relative_path para o log

                all_content += f"{header_separator}\n"
                # Usar o relative_path no cabeçalho do arquivo de saída
                all_content += f"Arquivo: {relative_path}\n"
                all_content += f"Formato: {file_extension_lower}\n"
                all_content += f"{header_separator}\n\n"

                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    all_content += content + "\n\n"
                except UnicodeDecodeError:
                    try:
                        with open(file_path, 'r', encoding='latin-1') as f:
                            content = f.read()
                        all_content += content + "\n\n"
                        all_content += f"Nota: Lido com encoding 'latin-1'.\n\n"
                    except Exception as e_latin:
                        error_msg = f"Erro ao ler o arquivo {relative_path} com UTF-8 e Latin-1: {e_latin}\nImpossível decodificar o conteúdo.\n\n"
                        all_content += error_msg
                        print(f"  AVISO: {error_msg.strip()}")
                except Exception as e:
                    error_msg = f"Erro inesperado ao ler o arquivo {relative_path}: {e}\n\n"
                    all_content += error_msg
                    print(f"  ERRO: {error_msg.strip()}")

                all_content += f"{footer_separator}\n"
                # Usar o relative_path no rodapé do arquivo de saída
                all_content += f"Fim do arquivo: {relative_path}\n"
                all_content += f"{footer_separator}\n\n\n"

    return all_content

def write_output_file(folder_path, folder_tree_structure, all_content):
    """Escreve a estrutura da árvore e o conteúdo concatenado em um arquivo de saída."""
    if not folder_tree_structure and not all_content:
        print("Nenhuma estrutura ou conteúdo relevante encontrado para gerar o output.")
        return

    folder_name = os.path.basename(folder_path)
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    output_filename = f"mapeamento_{folder_name}_{timestamp}.txt"
    output_path = os.path.join(os.getcwd(), output_filename)

    print(f"\nGerando arquivo de saída: {output_path}")

    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(f"Mapeamento da Pasta: {folder_path}\n")
            f.write(f"Gerado em: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Diretórios Ignorados: {', '.join(sorted(IGNORE_DIRS))}\n") # Informa diretórios ignorados
            f.write("=" * 80 + "\n")
            f.write("ESTRUTURA DA PASTA (excluindo ignorados)\n")
            f.write("=" * 80 + "\n\n")

            if folder_tree_structure:
                f.write(folder_tree_structure)
            else:
                f.write("Nenhuma estrutura de pasta encontrada (ou pasta raiz inválida).")
            f.write("\n\n" + "=" * 80 + "\n")
            f.write(f"CONTEÚDO DOS ARQUIVOS ({', '.join(sorted(ALLOWED_EXTENSIONS))})\n")
            f.write("=" * 80 + "\n\n")

            if all_content:
                f.write(all_content)
            else:
                 f.write(f"Nenhum conteúdo de arquivos {', '.join(sorted(ALLOWED_EXTENSIONS))} encontrado ou erro na leitura.\n")

        print(f"Arquivo de saída '{output_filename}' gerado com sucesso no diretório atual!")

    except IOError as e:
        print(f"Erro ao escrever o arquivo de saída: {e}")
    except Exception as e:
         print(f"Erro inesperado ao gerar o arquivo: {e}")

# --- Execução Principal ---
if __name__ == "__main__":
    print("Iniciando script de mapeamento de pasta...")
    selected_folder = select_folder()

    if selected_folder:
        print(f"\nPasta selecionada: {selected_folder}")
        # 1. Gerar a estrutura da árvore (ignorando .git, etc.)
        print("\nGerando estrutura da árvore de pastas...")
        tree_structure_string = generate_folder_tree(selected_folder)

        # 2. Extrair o conteúdo dos arquivos permitidos (ignorando .git, etc.)
        print("\nExtraindo conteúdo dos arquivos permitidos...")
        combined_content = map_content_only(selected_folder)

        # 3. Escrever tudo no arquivo de saída
        write_output_file(selected_folder, tree_structure_string, combined_content)
    else:
        print("Operação cancelada pelo usuário.")

    print("\nScript finalizado.")
