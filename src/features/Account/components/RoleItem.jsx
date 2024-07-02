import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from '@mui/material';

const RoleItem = ({ label, values, onChangeRoleList, roleNow }) => {
    const [roles, setRoles] = useState([]);
//values = {value: _id, name: tentaikhoan}
// roleNow = {'id_accout'}
    useEffect(() => {
        setRoles(values)
    }, [values])

    useEffect(() => {
        if (roleNow) {
            let newState = []
            values.forEach(i => {
                if (roleNow.indexOf(i.value) !== -1) {
                    newState.push({
                        name: i.name,
                        value: i.value,
                        isChecked: true
                    })
                } else {
                    newState.push({
                        name: i.name,
                        value: i.value,
                        isChecked: false
                    })
                }
            })
            setRoles(newState)
        } else {
            setRoles(values)
        }
    }, [roleNow])
    //function change checkbox
    const handleChange = (e) => {
        const { name, checked } = e.target;

        if (name === "allSelect") {
            let tempRole = roles.map(role => {
                return { ...role, isChecked: checked }
            }
            );
            console.log(tempRole)
            setRoles(tempRole)
            let checkedFilter = [];
            let unCheckedFilter = [];

            tempRole.forEach(i => {
                if (i.isChecked === true) {
                    checkedFilter.push({value: i.value, name: i.name})
                } else {
                    unCheckedFilter.push({value: i.value, name: i.name})
                }
            });

            onChangeRoleList(checkedFilter, unCheckedFilter)
        } else {
            let tempRole = roles.map(role =>
                role.value === name ? { ...role, isChecked: checked } : role
            );
            let checkedFilter = []; // danh sách checked
            let unCheckedFilter = [];
            
            tempRole.forEach(i => {
                if (i.isChecked === true) {
                    checkedFilter.push({value: i.value, name: i.name})
                } else {
                    unCheckedFilter.push({value: i.value, name: i.name})
                }
            })
            setRoles(tempRole);
            onChangeRoleList(checkedFilter, unCheckedFilter)
        }
    };


    return (
        <div className="my-2 lg:basis-1/2">
            <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold">Chọn tất cả: <span className=" font-semibold">{label}</span></span>
                <input
                    className="w-4 h-4"
                    type="checkbox"
                    // checked={roles.filter(role => role?.isChecked !== true).length < 1}
                    name="allSelect"
                    value="allSelect"
                    onChange={handleChange}
                />
            </div>

            <div className="h-[300px] overflow-y-scroll">
            {roles && roles.map((role, index) => (
                <div className="flex items-center space-x-2 ml-2" key={role.name}>
                    <input
                        className="w-4 h-4"
                        type="checkbox"
                        checked={role?.isChecked || false}
                        name={role.value}
                        onChange={handleChange}
                    />
                    <label className="text-sm">{role.name}</label>
                </div>
            ))}
            </div>
        </div>
    );
}

export default RoleItem;
