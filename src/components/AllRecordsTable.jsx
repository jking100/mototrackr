import { useEffect, useState } from "react";
import { userSubmissionItemService } from "@/api";

export function AllRecordsTable() {
    const [userSubmissions, setUserSubmissions] = useState();

    useEffect(() =>{
        getData();
    },[]);

    const tableContents = userSubmissions === undefined
    ? <span className="loading loading-bars loading-md text-accent"></span>
    : <div className="overflow-x-auto">
        <table className="table table-md table-pin-rows table-pin-cols">
            <thead>
                <tr>
                    <th></th>
                    <td>Name</td>
                    <td>Vehicle</td>
                    <td>Time</td>
                </tr>
            </thead>
            <tbody>
                {userSubmissions.map((userSubmissions, index) =>
                    <tr key={userSubmissions.id}>
                        <td>{index+1}</td>
                        <td>{userSubmissions.personName}</td>
                        <td>{userSubmissions.vehicleName}</td>
                        <td>{userSubmissions.zeroToSixtyTime}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>;
    
    return (
        <>
            {tableContents}
        </>
    );

    async function getData() {
        const data = await userSubmissionItemService.getAll();
        setUserSubmissions(data);
    };
}