import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { toast } from 'react-toastify';

const GetVideos = ({ data }: { data: { title: string, _id: string, isExpired: boolean }[] }) => {

    return (
        <table style={{ width: "100vw", textAlign: "center", marginTop: '20px' }} >
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Title</th>
                    <th>isExpired?</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((ele, i) => {
                        return <tr key={i} >
                            <td>
                                <Link target='_blank' href={`https://client-mocha-zeta.vercel.app/sample-video/${ele._id}`}>
                                    URL
                                </Link>
                            </td>
                            <td>{ele.title}</td>
                            <td>{ele.isExpired ? "YES" : "NO"}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default GetVideos
