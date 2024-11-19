import { useRouter } from 'next/router';

export default function UpdatePage() {
    const router = useRouter();
    const { id } = router.query; // Captures the dynamic part of the route

    return (
        <div>
            <h1>Update Page</h1>
            <p>Updating item with ID: {id}</p>
        </div>
    );
}