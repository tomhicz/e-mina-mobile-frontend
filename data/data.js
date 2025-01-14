import {retrieveUserSession} from '../data/secureStorage';
import NetInfo from '@react-native-community/netinfo';
import {Toast} from 'native-base';
import { useNavigation } from '@react-navigation/native';


checkConnectivity = () => {
  try {
    NetInfo.fetch().then(state => {
      if (!state.isInternetReachable) {
        const id = "conn-toast"
       if (!Toast.isActive(id)) {
        Toast.show({
          title: "You are currently offline.",
          description: "You still have access to your saved locations.",
          status: "error",
          duration: null,
           id:"conn-toast",
           onCloseComplete: () => {
            //navigation.navigate("Home") 
            console.log("closed")}
        })
      }
    } else {
       Toast.closeAll()
    }
    });

  } catch (err) {
    console.log(err);
  }
};

export const locResultsByMedia = async mediaId => {
  try {
    checkConnectivity();
    const userToken = await retrieveUserSession();
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/media/${mediaId}/locations`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
        // body data type must match "Content-Type" header
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const locationResultApi = async () => {
  try{
    const userToken = await retrieveUserSession();
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/locations`,
      {
        method: 'GET',
        headers: {         
          'Content-Type': 'application/json',   
          'Authorization': `Bearer ${userToken['token']}`   
          },
          // body data type must match "Content-Type" header     
        });     
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const mediaResultsApi = async () => {
  try {
    checkConnectivity();
    const userToken = await retrieveUserSession();
    const response = await fetch(
      'https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/media',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
        // body data type must match "Content-Type" header
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const savedLocationsApi = async userId => {
  try {
    checkConnectivity();
    const userToken = await retrieveUserSession();
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/bookmarks`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
        // body data type must match "Content-Type" header
      },
    );
    const data = await response.json();
    return data[0].bookmarks;
  } catch (err) {
    console.log(err);
  }
};

export const photosByUser = async userId => {
  try {
    checkConnectivity();
    const userToken = await retrieveUserSession();
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/photo`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
        // body data type must match "Content-Type" header
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const photosByLocation = async locationId => {
  try {
    checkConnectivity();
    const userToken = await retrieveUserSession();
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/location/${locationId}/photo`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
        // body data type must match "Content-Type" header
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//export default mediaResults;
export const dynamicSavedLocationsApi = async (userId, inputdata, method) => {
  try {
    checkConnectivity();

    const userToken = await retrieveUserSession();

    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/bookmarks`,
      {
        method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
        body: JSON.stringify(inputdata), // body data type must match "Content-Type" header
      },
    );
    const data = await response.text();
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

export const apiAuth = async (userId, userEmail) => {
  try {
    checkConnectivity();
    const response = await fetch(
      'https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/auth',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({_id: userId, email: userEmail}),
        // body data type must match "Content-Type" header
      },
    );
    const data = await response.text();
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

export const authTest = async () => {
  try {
    const userToken = await retrieveUserSession();
    //console.log('userToken pure:', userToken['token']);
    const response = await fetch(
      'https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/authtest',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
        // body data type must match "Content-Type" header
      },
    );
    const data = await response.text();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getProfile = async userId => {
  try {
    const userToken = await retrieveUserSession();
    //console.log('userToken pure:', userToken['token']);
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/profile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
      },
    );
    const data = await response.json();
    console.log('getProfile', typeof data);
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

export const updateProfile = async (userId, inputdata) => {
  try {
    const userToken = await retrieveUserSession();
    //console.log('userToken pure:', userToken['token']);
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/profile`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
        // body data type must match "Content-Type" header
        body: JSON.stringify(inputdata), // body data type must match "Content-Type" header
      },
    );
    const data = await response.text();
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

export const deletePhoto = async _id => {
  const userToken = await retrieveUserSession();
  const url = `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/photo/${_id}`;
  return await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userToken['token']}`,
    },
  })
    .then(response => response.text())
    .catch(error => {
      console.warn(error);
    });
};

export const getUser = async userId => {
  try {
    const userToken = await retrieveUserSession();
    //console.log('userToken pure:', userToken['token']);
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
      },
    );
    const data = await response.json();
    console.log('getProfile', typeof data);
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

export const getLocation = async locationId => {
  try {
    const userToken = await retrieveUserSession();
    //console.log('userToken pure:', userToken['token']);
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/locations/${locationId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken['token']}`,
        },
      },
    );
    const data = await response.json();
    console.log('getProfile', typeof data);
    return data;
  } catch (err) {
    console.log('error', err);
  }
};
