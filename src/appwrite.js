import {Client, Databases, Query, ID} from 'appwrite';
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (movie) => {
    console.log(PROJECT_ID);
    console.log(DATABASE_ID);
    console.log(COLLECTION_ID);
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('movie_id', movie.id),
        ])
        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                movie_title: movie.title,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    } catch (e) {
        console.log(`Error occurred: ${e}`);
        console.log(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    }
}

export const getTrendingMovies = async () => {
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])
        return result.documents;
    }
    catch(err){
        console.log(`Error fetching trending movies: ${err.message}`);
    }
}