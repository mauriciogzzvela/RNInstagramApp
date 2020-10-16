import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

auth()
    .signInAnonymously()
    .then(() => {
        console.log('User signed in anonymously');
    })
    .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
    });

const Firebase = {

    uploadImage: post => {

        const id = uuid.v4();

        const fileExtension = post.photo.uri.split('.').pop();

        console.log(fileExtension);

        const fileName = `${id}.${fileExtension}`;

        console.log(fileName);

        var reference = storage().ref(`/posts/images/${fileName}`);

        const task = reference.putFile(post.photo.uri)

            .on(storage.TaskEvent.STATE_CHANGED, taskSnapshot => {

                    //checamoe el status
                    console.log('snapshot: ' + taskSnapshot.state);

                    //vemos el progreso de subida de la imagen
                    console.log("progress: " + (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);

                    if (taskSnapshot.state === storage.TaskState.SUCCESS) {
                        console.log("Success");
                    }

                },
                error => {
                    console.log("image upload error: " + error.toString());
                },
                () => {

                    reference.getDownloadURL().then((downloadURL) => {
                        //URL de la imagen
                        console.log('Archivo disponible en: ' + downloadURL);

                        delete post.photo;

                        post.imageURL = downloadURL;

                        Firebase.uploadPost(post);

                    });


                }
            )

    },

    uploadPost: post => {
        const id = uuid.v4();

        const uploadData = {
            id: id,
            postPhoto: post.imageURL,
            postTitle: post.title,
            postDescription: post.description,
            likes: []
        }
        return firestore()
            .collection('posts')
            .doc(id)
            .set(uploadData)
    },
    getPosts: () => {
        return firestore()
            .collection('posts')
            .get()
            .then(function(querySnapshot) {
                let posts = querySnapshot.docs.map(doc => doc.data())
                // console.log(posts)
                return posts
            })
            .catch(function(error) {
                console.log('Error getting documents: ', error)
            })
    }
}

export default Firebase
