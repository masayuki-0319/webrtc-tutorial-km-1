type SendMessage = {
  type: 'login';
  name: string;
};

type ReturnMessage = {
  type: 'login';
  success: boolean;
};
