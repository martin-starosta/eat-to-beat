import {Heading, Stack, Text} from "@chakra-ui/react";
import NewsletterSignupForm from "../components/Marketing/NewsletterSignupForm";

export default function Register() {

    return (
        <Stack spacing={4}>
            <Text fontSize={'2xl'}>Why did the application take a break from registering? Because it&apos;s still under development! But don&apos;t worry, we&apos;re always available by email if you need a little chat about possible cooperation.</Text>
            <Heading paddingTop={12}>Subscribe to our newsletter</Heading>
            <Text>If you want to get updates about this project, sign up for our newsletter. As a bonus, you will get 7-days meal plan.</Text>
            <NewsletterSignupForm />
        </Stack>
    )
}
