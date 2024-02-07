export const loadImagePreview = (file: File): Promise<string | null> => {
  if (!file.type.startsWith('image/')) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const imageUrl = event.target?.result as string;

      resolve(imageUrl);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const getImagesPreview = async (files: File[]) =>
  files.reduce(async (prevPromise, file, idx) => {
    const prevResult = await prevPromise;
    const imageUrl = await loadImagePreview(file);

    return { ...prevResult, [idx]: imageUrl };
  }, Promise.resolve<{ [key: number]: string | null }>({}));
