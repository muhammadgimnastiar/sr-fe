import Cookies from "universal-cookie";

export const getUserAuthHeaderApi = () => {
  const cookies = new Cookies();

  const header = {
    Authorization: `Bearer ${cookies.get("access_token")}`,
  };

  return header;
};
