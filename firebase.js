import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  get,
} from 'firebase/database'

// ══════════════════════════════════════════════════════════
// Projeto Firebase dedicado deste sistema (up2k27).
// ⚠️ Confira o valor de databaseURL abaixo — o Firebase não
// mostra esse campo no snippet de configuração padrão. Vá em
// Firebase Console → Realtime Database e copie a URL exibida
// no topo da página (crie o banco antes, se ainda não existir).
// Se a URL real for diferente da que está aqui, é só substituir.
// ══════════════════════════════════════════════════════════
const firebaseConfig = {
  apiKey: 'AIzaSyAB7RDBDJZOzt1Jb0JYYVlJNKq9A-gKqBY',
  authDomain: 'up2k27.firebaseapp.com',
  databaseURL: 'https://up2k27-default-rtdb.firebaseio.com',
  projectId: 'up2k27',
  storageBucket: 'up2k27.firebasestorage.app',
  messagingSenderId: '131390454891',
  appId: '1:131390454891:web:13f340292dfebc9c80852e',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)

// Projeto dedicado só a este sistema — sem precisar de prefixo pra
// isolar de outro app (como era necessário no projeto compartilhado).
const ADMINS_RAIZ = 'admins'

export function caminho(sub) {
  if (!sub) return '/';
  return sub.startsWith('/') ? sub : '/' + sub;
}


export function escutar(sub, callback) {
  return onValue(ref(db, caminho(sub)), (snap) => {
    callback(snap.exists() ? snap.val() : null)
  })
}

export function escutarAdmins(callback) {
  return onValue(ref(db, ADMINS_RAIZ), (snap) => {
    callback(snap.exists() ? snap.val() : {})
  })
}

export function salvar(sub, valor) {
  return set(ref(db, caminho(sub)), valor)
}

export function salvarAdmin(uid) {
  return set(ref(db, `${ADMINS_RAIZ}/${uid}`), true)
}

export function novaChave(sub) {
  return push(ref(db, caminho(sub))).key
}

export async function lerUmaVez(sub) {
  const snap = await get(ref(db, caminho(sub)))
  return snap.exists() ? snap.val() : null
}

// Converte "Marina" -> um e-mail sintético fixo, para poder usar o
// Firebase Authentication (login/senha real) com um simples usuário e senha.
export function usuarioParaEmail(usuario) {
  const limpo = usuario
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.+|\.+$/g, '')
  return `${limpo || 'admin'}@credibilita-ranking.app`
}

export function entrarComoAdmin(usuario, senha) {
  return signInWithEmailAndPassword(auth, usuarioParaEmail(usuario), senha)
}

export function criarContaAdmin(usuario, senha) {
  return createUserWithEmailAndPassword(auth, usuarioParaEmail(usuario), senha)
}

export function sairAdmin() {
  return signOut(auth)
}

export function ouvirMudancaAuth(callback) {
  return onAuthStateChanged(auth, callback)
}
