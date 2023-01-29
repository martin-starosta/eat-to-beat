import {Button, FormControl, Input} from "@chakra-ui/react";
import {ChangeEvent, useEffect, useState} from "react";
import useAxios from "axios-hooks";

const NewsletterSignupForm = () => {
    const [email, setEmail] = useState<string>("");

    const [{ data, loading, error }, refetch] = useAxios(
        {
            url: "/api/emailSignup",
            method: "POST",
            data: { email },
        },
        {
            manual: true,
        }
    );
    useEffect(() => setEmail(""), []);

    useEffect(() => {
        if (data?.success === true && !loading) {
            setEmail("");
        }
    }, [data?.success, loading]);

    if(data?.success === true && !loading) {
        return <p>Thank you for subscribing!</p>
    }

    return (
        <>
            <FormControl>
                <Input
                    variant={"solid"}
                    borderWidth={1}
                    color={"gray.800"}
                    _placeholder={{
                        color: "gray.400",
                    }}
                    id={"email"}
                    type={"email"}
                    required
                    placeholder={"Your Email"}
                    aria-label={"Your Email"}
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                />
            </FormControl>
            <Button mx={4} onClick={() => refetch()} disabled={loading}>
                Sign up
            </Button>
        </>
    )
};

export default NewsletterSignupForm;
