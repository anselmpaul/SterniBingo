import {AsyncStorage} from "react-native";

export const getDataFromStore = async (key: string) => {
	try {
		const promise = AsyncStorage.getItem(key);
		return promise.then(data => {
			if (data) {
				return JSON.parse(data);
			}
		});
	} catch(e) {
		console.log(e);
	}
};

export const saveDataToStore = async (key: string, data: any) => {
	try {
		const dataAsString = JSON.stringify(data);
		await AsyncStorage.setItem(key, dataAsString);
	} catch(e) {
		console.log(e);
	}
};