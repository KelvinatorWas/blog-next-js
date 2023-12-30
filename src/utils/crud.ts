

export const getData = async <T>(link:string):Promise<T> => {
  try {
    const res = await fetch(link, {cache: "no-store"});
    if (!res.ok) {
      throw new Error(`Failed to get data. Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const uploadData = async <T>(link: string, data: T) => {

  try {
    console.log(link)
    const res = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to upload data. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error uploading data:', error);
    throw error;
  }
};