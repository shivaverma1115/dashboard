"use client";
import Link from "next/link";

const GetVideos = ({ data }: { data: { title: string; _id: string; isExpired: boolean }[] }) => {
    return (
        <div className="p-6 w-full overflow-x-auto">
            <h2 className="text-2xl font-bold text-center mb-4 text-teal-600">Video List 🎬</h2>

            <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
                <table className="w-full border-collapse bg-white text-sm text-gray-700">
                    <thead className="bg-teal-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-center">URL</th>
                            <th className="px-6 py-3 text-center">Title</th>
                            <th className="px-6 py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data?.map((ele, i) => (
                            <tr key={i} className="hover:bg-gray-100">
                                <td className="px-6 py-3 text-center">
                                    <Link
                                        href={`${process.env.NEXT_PUBLIC_CLIENT_URL}sample-video/${ele._id}`}
                                        target="_blank"
                                        className="text-blue-500 font-semibold hover:underline"
                                    >
                                        Open Video
                                    </Link>
                                </td>
                                <td className="px-6 py-3 text-center font-medium">{ele.title}</td>
                                <td className="px-6 py-3 text-center">
                                    <span
                                        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${ele.isExpired ? "bg-red-500 text-white" : "bg-green-500 text-white"
                                            }`}
                                    >
                                        {ele.isExpired ? "Expired" : "Active"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetVideos;
