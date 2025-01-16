import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6788cb94002adcfc9d0a'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
