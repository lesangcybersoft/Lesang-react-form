import React, { useEffect} from "react";
import { } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BTFormActions } from "../redux/slice";

const FormInput = ({ inputValue, setInputValue,messErr,setMessErr }) => {
    const dispatch = useDispatch();
    const { studentList, editStd } = useSelector((state) => state.BTForm);
    useEffect(() => {
        if (editStd) {
            setInputValue(editStd);
        }
    });

    const handleInputForm = () => (event) => {
        const { name, value, validity, title, minLength } = event.target;
        let mess = "";
        const validate = () => {
            const { tooShort, patternMismatch } = validity;
            if (value.replace(/\s/g, "").length === 0) {
                mess = `Vui lòng nhập ${title}`;
            } else if (tooShort) {
                mess = `Vui lòng nhập ${title} ít nhất ${minLength} ký tự`;
            } else if (patternMismatch) {
                mess = `Vui lòng nhập ${title} đúng định dạng`;
            } else if (name === "id") {
                for (let key in studentList) {
                    if (studentList[key].id * 1 === value * 1) {
                        mess = `${title} bị trùng`;
                    }
                }
            }
            return mess;
        };
        mess = validate();
        setMessErr({
            ...messErr,
            [name]: mess,
        });

        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    return (
        <div className="container">
            <div className="">
                <h2 className="text-5xl py-3 bg-gray-700 text-white font-bold mb-2">Thông Tin Sinh Viên</h2>
            </div>
            <form
                noValidate
                onSubmit={(event) => {
                    event.preventDefault();
                    const inputElement =
                        document.querySelectorAll(".inputValue");
                    let errors = {};
                    inputElement.forEach((ele) => {
                        let mess = "";
                        const { name, value, validity, title, minLength } = ele;
                        const { tooShort, patternMismatch } = validity;

                        if (value.replace(/\s/g, "").length === 0) {
                            mess = `Vui lòng nhập ${title}`;
                        } else if (tooShort) {
                            mess = `Vui lòng nhập ${title} ít nhất ${minLength} ký tự`;
                        } else if (patternMismatch) {
                            mess = `Vui lòng nhập ${title} đúng định dạng`;
                        }
                        errors[name] = mess;
                    });
                    setMessErr(errors);
                    let isFlag = false;
                    for (let key in errors) {
                        if (errors[key]) {
                            isFlag = true;
                            break;
                        }
                    }
                    if (!isFlag) {
                        if (!editStd) {
                            dispatch(BTFormActions.addStudent(inputValue));
                            setMessErr({});
                            setInputValue({});
                        } else {
                            dispatch(BTFormActions.saveStudent(inputValue));
                            dispatch(BTFormActions.resetForm())
                            document.getElementById('maSV').readOnly = false
                            setMessErr({});
                            setInputValue({});
                        }
                    }
                }}
            >
                <div className="row">
                    <div className="col-6 py-3">
                        <p className="text-2xl">Mã SV</p>
                        <input
                            type="text"
                            id="maSV"
                            name="id"
                            title="mã sinh viên"
                            value={inputValue?.id || ""}
                            required
                            minLength={3}
                            placeholder="Nhập mã sinh viên"
                            className="form-control inputValue"
                            onChange={handleInputForm()}
                        />
                        {messErr?.id && (
                            <p className="text-danger">* {messErr.id}</p>
                        )}
                    </div>
                    <div className="col-6 py-3">
                        <p className="text-2xl">Họ và tên</p>
                        <input
                            type="text"
                            name="name"
                            title="họ và tên"
                            value={inputValue?.name || ""}
                            required
                            minLength={2}
                            pattern="^[\p{L} ]+$"
                            placeholder="Nhập họ và tên"
                            className="form-control inputValue"
                            onChange={handleInputForm()}
                        />
                        {messErr?.name && (
                            <p className="text-danger">* {messErr.name}</p>
                        )}
                    </div>
                    <div className="col-6 py-3">
                        <p className="text-2xl">Số điện thoại</p>
                        <input
                            type="text"
                            name="phone"
                            title="số điện thoại"
                            value={inputValue?.phone || ""}
                            minLength={10}
                            required
                            pattern="(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b"
                            placeholder="Nhập số điện thoại"
                            className="form-control inputValue"
                            onChange={handleInputForm()}
                        />
                        {messErr?.phone && (
                            <p className="text-danger">* {messErr.phone}</p>
                        )}
                    </div>
                    <div className="col-6 py-3">
                        <p className="text-2xl">Email</p>
                        <input
                            type="text"
                            name="email"
                            title="email"
                            value={inputValue?.email || ""}
                            required
                            minLength={5}
                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            placeholder="Nhập email"
                            className="form-control inputValue"
                            onChange={handleInputForm()}
                        />
                        {messErr?.email && (
                            <p className="text-danger">* {messErr.email}</p>
                        )}
                    </div>
                </div>
                <div className="text-center">
                    {editStd ? (
                        <button
                            className="btn btn-outline-success mt-2"
                            type="submit"
                        >
                            Lưu
                        </button>
                    ) : (
                        <button
                            className="bg-green-500 p-4 text-left block text-3xl font-bold text-white"
                            type="submit"
                        >
                            Thêm Sinh Viên
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormInput;
