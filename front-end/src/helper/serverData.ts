import getAxios from './wrappedAxios';

const serverData = async (server: string, key: string) => {
  const axios = getAxios(server);

  try {
    let response = await axios.get(`/spellcheck/${key}`);
    return response.data;
  } catch (error: any) {
    console.log('spellcheck error: ', error);
  }
};

export default serverData;
