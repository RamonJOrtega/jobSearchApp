import axiosGet from "@/helpers/axiosHelpers";

export default async function MainTablePage() {
    const jobURL = 'https://4dayweek.io/api';
    const res = await axiosGet(jobURL);
    return (
        <div>
            <h1>company Page</h1>
            <p>companies</p>
        </div>
    )
}