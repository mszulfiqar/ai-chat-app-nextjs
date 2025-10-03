export type Inputs = {
    name: string
    email: string
    password: string
    // confirmPassword: string
}

export type CreateAccountProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};