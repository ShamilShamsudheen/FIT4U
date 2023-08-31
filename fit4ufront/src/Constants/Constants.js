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
export const formatDate = (date) => {
    const now = new Date();
    const blogDate = new Date(date);
    const diffInMilliseconds = Math.abs(now - blogDate);

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 12 * month;

    if (diffInMilliseconds < minute) {
        return 'Just now';
    } else if (diffInMilliseconds < hour) {
        const minutesAgo = Math.floor(diffInMilliseconds / minute);
        return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInMilliseconds < day) {
        const hoursAgo = Math.floor(diffInMilliseconds / hour);
        return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInMilliseconds < month) {
        const daysAgo = Math.floor(diffInMilliseconds / day);
        return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
    } else if (diffInMilliseconds < year) {
        const monthsAgo = Math.floor(diffInMilliseconds / month);
        return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
    } else {
        const yearsAgo = Math.floor(diffInMilliseconds / year);
        return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
    }
}

export const truncateString = (str, maxLength)=> {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  }

// Define a function to format the timestamp

// aszdxfcgvbhnjm
export const formatTimestamp =(timestamp)=> {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return new Date(timestamp).toLocaleTimeString([], options);
  }