import { useState } from 'react';

function usePreview() {
  const [file, setFile] = useState();

  const handleChangeFile = (e: any) => {
    const selectFile = e.target.files[0];
    setFile(URL.createObjectURL(selectFile) as any);
  };

  return { file, handleChangeFile };
}

export default usePreview;
