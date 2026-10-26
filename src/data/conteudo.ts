// Lê o conteúdo editado no painel (/keystatic) na hora do build.
// Os arquivos ficam em src/content/ (YAML) e as fotos em public/images/.
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export const lerInicio = () => reader.singletons.inicio.readOrThrow();
export const lerSobre = () => reader.singletons.sobre.readOrThrow();
export const lerContato = () => reader.singletons.contato.readOrThrow();
export const lerConfig = () => reader.singletons.config.readOrThrow();
export const lerObras = () => reader.collections.obras.all();
