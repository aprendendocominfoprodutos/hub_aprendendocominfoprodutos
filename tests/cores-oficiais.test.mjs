import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const source = (name) => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
test('a paleta oficial 1.0 é declarada no CSS central', () => {
  const css = source('public/src/portal.css').toLowerCase();
  for (const hex of ['#07131f','#0d2636','#e8c77e','#f6f0e6','#121e34','#b88a57','#10392c','#b7dc9d','#ea9c54','#f5f3ec','#0b2127','#b8f06e']) {
    assert.ok(css.includes(hex), 'Token de cor ausente: ' + hex);
  }
});
test('hubs identificam os temas e preservam suas rotas', () => {
  for (const [name,theme] of [['cultura-entretenimento','cultura'],['fitness-saude','fitness'],['mental-financeiro','mental']]) {
    const html=source('public/'+name+'/index.html');
    assert.ok(html.includes('eco-theme-'+theme), name);
    assert.ok(html.includes('href="/"'),name);
  }
});
test('Menú Familiar mantém superfície clara e rotas regionais', () => {
  const css=source('public/src/menu-familiar-mercados.css');
  const html=source('public/fitness-saude/alimentacao/receitas/cardapios-semanais/menu-familiar/index.html');
  assert.ok(css.includes('background:#f5f3ec'));
  assert.ok(css.includes('background:#07131f'));
  assert.ok(html.includes('/menu-familiar/latam/'));
  assert.ok(html.includes('/menu-familiar/brasil/'));
});
