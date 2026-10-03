import {mkdir, writeFile} from 'node:fs/promises';
const url='https://damp-base-4abd.alisson-lopes30.workers.dev/resources/natal-pratico-original.pdf';
const out='public/resources/natal-pratico-original.pdf';
await mkdir('public/resources',{recursive:true});
const r=await fetch(url);
if(!r.ok) throw new Error('Falha ao baixar o PDF de apoio: '+r.status);
await writeFile(out, Buffer.from(await r.arrayBuffer()));
console.log('PDF de apoio preparado para o deploy.');