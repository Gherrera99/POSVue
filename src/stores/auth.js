import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth, useFirestore } from "vuefire";
import { doc, getDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore( 'auth',() => {

    const db = useFirestore()
    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const isUserCreated = ref(null)
    const router = useRouter()
    const isAdmin = ref(false)

    const errorMessage = ref('')
    const confirmationMessage = ref('')
    const errorCodes = {
        'auth/invalid-credential' : 'El correo o la contraseña son incorrectos',
        'auth/weak-password' : 'Contraseña débil, mínimo 6 caracteres'
    }

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user){
                authUser.value = user
            }
        })
    })

    const createUser = ({ email, password }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user);
                isUserCreated.value = true


                confirmationMessage.value = 'La cuenta ha sido creada exitosamente'

                setTimeout(() => {
                    confirmationMessage.value = 'Inicia sesión a continuación, ¡Bienvenido!'
                }, 3000)

                setTimeout(() => {
                    confirmationMessage.value = ''
                    logout()
                    router.push({name: 'login'})
                },6000)
            })
            .catch(error => {
                console.log(error.code);
                errorMessage.value = errorCodes[error.code]
            })
    }

    const login = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then( (userCredential) =>{
                const user = userCredential.user
                authUser.value = user
                verificarAdmin(user).then(r => {
                    if(isAdminUser){
                        router.push({name: 'sales'})
                    } else {
                        router.push({name: 'shop'})
                    }
                })
            })
            .catch(error => {
                console.log(error);
                errorMessage.value = errorCodes[error.code]
            })
    }

    const logout = () => {
        signOut(auth).then(() => {
            authUser.value = null
            isUserCreated.value = null
            isAdmin.value = false
        }).catch(error => {
            console.log(error);
        })
    }

    async function verificarAdmin(user){
        if(authUser.value !== null){
            const email = user.email
            const docRef = doc(db, 'admin', 'S1u9UYSZNCIje47kaTWE')
            const docSnap = await getDoc(docRef)
            const data  = docSnap.data()

            for (const dataKey in data) {
                if (email === data[dataKey]){
                    isAdmin.value = true
                }
            }
        }
    }

    const hasError = computed(() => {
        return errorMessage.value
    })

    const isAuth = computed(() => {
        return authUser.value
    })

    const isCreated = computed(() => {
        return isUserCreated.value
    })

    const isAdminUser = computed(() => {
        return isAdmin.value
    })

    return {
        createUser,
        login,
        logout,
        hasError,
        errorMessage,
        confirmationMessage,
        isAuth,
        isCreated,
        isAdminUser
    }
})