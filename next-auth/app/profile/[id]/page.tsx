import Link from "next/link";

interface ProfileParams {
    params: {
        id: string;
    };
};

const ProfileIdPage = ({ params }: ProfileParams) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="text-2xl mb-2">
                User ID: {params.id}
            </h1>
            <Link href="/profile">
                Profile Page
            </Link>
        </div>
    )
}

export default ProfileIdPage;