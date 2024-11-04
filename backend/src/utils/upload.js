import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const getCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

export const uploadSingleFile = async (file, folder) => {
  const dateTime = getCurrentDateTime();
  const storage = getStorage();

  const storageRef = ref(storage, `images/${file.originalname}/${dateTime}`);
  const urlRef = `images/${file.originalname}/${dateTime}`;
  const metadata = {
    contentType: file.mimetype,
  };
  const snapshot = await uploadBytesResumable(
    storageRef,
    file?.buffer,
    metadata
  );
  const downloadURL = await getDownloadURL(snapshot.ref);

  return { downloadURL, urlRef };
};
