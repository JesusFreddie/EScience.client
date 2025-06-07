import { useToast } from "#imports";

type Error = {
    message: string;
    status: number;
    description?: string;
}

export const useErrorToast = (error: Error) => {
    const toast = useToast();
    return toast.add({
        description: error.description ?? `Status code: ${error.status}`,
        title: error.message,
        color: error.status! >= 500 ? "red" : "orange" 
    })
}