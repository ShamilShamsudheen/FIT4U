import {storage} from '../firebase/config'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'

export const fileUpload = async ( path, data) =>{
    try {
        const storageRef = ref(storage,path + data.name)
        const snapshot = await uploadBytes(storageRef,data)
        return getDownloadURL(snapshot.ref)
    } catch (error) {
        console.log(error.message)
    }
}

export const CLIENT_ID = "218979441807-vqp0lda53qd3dfdkvqcti2mgjbn3obs1.apps.googleusercontent.com";