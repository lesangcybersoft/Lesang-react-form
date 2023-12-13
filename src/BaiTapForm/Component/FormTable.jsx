import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BTFormActions } from "../redux/slice";

const FormTable = (pros) => {
    const { setInputValue, searchList, setSearchList, setMessErr } = pros;
    const dispatch = useDispatch();
    const { studentList } = useSelector((state) => state.BTForm);

    const vietHoa = (string) => {
        const str = string.toLowerCase().split(" ");
        const arr = str.map((word) => {
            return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
        });
        return arr.join(" ");
    };

    useEffect(() => {
        const valueSearch = document.getElementById("searchInput").value;
        const nameSearch = valueSearch.replace(/\s/g, "").toUpperCase();
        let search = studentList.filter(
            (student) =>
                student.name
                    .replace(/\s/g, "")
                    .toUpperCase()
                    .indexOf(nameSearch) !== -1
        );
        setSearchList(search);
    });
    return (
        <div className="container mt-3 border p-2 ">
            <div className="d-flex justify-content-center">
                <input
                    className="form-control mb-2 border-info text-right w-50"
                    id="searchInput"
                    type="text"
                    placeholder="Nhập tên để tìm sinh viên"
                    onChange={(event) => {
                        const { value } = event.target;
                        const nameSearch = value
                            .replace(/\s/g, "")
                            .toUpperCase();
                        let search = studentList.filter(
                            (student) =>
                                student?.name
                                    .replace(/\s/g, "")
                                    .toUpperCase()
                                    .indexOf(nameSearch) !== -1
                        );
                        if (search.length === 0) {
                            setSearchList([]);
                        } else {
                            setSearchList(search);
                        }
                    }}
                />
                <span className="pt-2">Tìm kiếm </span>
                
            </div>
            <table class="table bg-slate-700">
                <thead>
                    <tr className="">
                        <th>Mã SV</th>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(searchList ? searchList : studentList).map((student) => {
                        return (
                            <tr key={student.id}>
                                <td className="fw-bold">{student.id}</td>
                                <td>{vietHoa(student.name)}</td>
                                <td>{student.phone}</td>
                                <td>{student.email}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => {
                                                dispatch(
                                                    BTFormActions.editStudent(
                                                        student
                                                    )
                                                );
                                                setMessErr({});
                                                let maSV =
                                                    document.getElementById(
                                                        "maSV"
                                                    );
                                                maSV.readOnly = true;
                                            }}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "Bạn có chắc chắn muốn xoá thông tin sinh viên này không?"
                                                    )
                                                ) {
                                                    dispatch(
                                                        BTFormActions.deleteStudent(
                                                            student.id
                                                        )
                                                    );
                                                    setInputValue({});
                                                }
                                            }}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default FormTable;
