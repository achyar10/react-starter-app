import { cilPlus, cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CRow, CCol, CBadge, CCard, CCardBody, CSpinner, CTooltip, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CFormLabel, CFormInput, CFormSelect } from "@coreui/react"
import { useEffect, useState } from "react";
import { userService } from "../../services";
import { IUser } from "../../services/user";
import { toastUtil } from "../../utils";
import { capitalize, strToBool } from "../../utils/common.util";
import Pagination from 'react-js-pagination'

const Index = () => {

    const [data, setData] = useState<IUser[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [totalDocs, setTotalDocs] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false)
    const [modal, setModal] = useState(false);
    const [obj, setObj] = useState<any>(null);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await userService.getUser({ page, limit });
                setData(response.data)
                setPage(response.meta.page);
                setLimit(response.meta.limit);
                setTotalDocs(response.meta.totalDocs);
                setTotalPage(response.meta.totalPages);
                setUpdate(false)
            } catch (error: any) {
                toastUtil.useAlert(error.message)
            }
            setLoading(false);
        };
        fetch();
    }, [page, limit, update]);


    const toggle = (obj?: any) => {
        if (!modal) {
            setModal(true)
            if (obj) {
                setObj(obj)
            } else {
                setObj(null)
            }
        } else {
            setModal(false)
        }
    }

    let no = (page - 1) * limit + 1;
    return (
        <>
            <CRow>
                <CCol md={12}>
                    <div className="mb-3">
                        <h5>Kelola User Pengguna <button className="btn btn-sm btn-danger text-white float-end" onClick={() => toggle()}><CIcon icon={cilPlus} /> Tambah User</button></h5>
                    </div>
                    <CCard className="mb-2">
                        {isLoading && <div className="text-center"><CSpinner color="info" /></div>}
                        <CCardBody>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="bg-light">
                                            <th>No</th>
                                            <th>Username</th>
                                            <th>Nama Lengkap</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((el, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{no++}</td>
                                                    <td>{el.username}</td>
                                                    <td>{el.fullname}</td>
                                                    <td>{capitalize(el.role)}</td>
                                                    <td>{el.is_active ? (<CBadge color="success">Aktif</CBadge>) : (<CBadge color="danger">Tidak Aktif</CBadge>)}</td>
                                                    <td>
                                                        <CTooltip placement="top" content="Ubah">
                                                            <button className="d-inline btn btn-sm btn-info text-white text-nowrap ms-1" onClick={() => toggle(el)}><CIcon icon={cilPencil} /></button>
                                                        </CTooltip>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <span className="fw-light">Menampilkan {data.length} dari {totalDocs} data</span>
                            <div className="float-end">
                                <Pagination
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={page}
                                    itemsCountPerPage={limit}
                                    totalItemsCount={totalDocs}
                                    pageRangeDisplayed={totalPage}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal visible={modal} onClose={() => setModal(false)}>
                <CModalHeader closeButton><h5>Form</h5></CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <CFormLabel htmlFor="username">Username <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="text" id="username" placeholder="Cth: jhon" onChange={(e) => setObj({ ...obj, username: e.target.value })} value={obj?.username} />
                    </div>
                    {!obj?.id && <div className="mb-3">
                        <CFormLabel htmlFor="password">Password <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="password" id="password" onChange={(e) => setObj({ ...obj, password: e.target.value })} />
                        <CFormLabel htmlFor="password">Konfirmasi Password <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="password" id="conf_password" onChange={(e) => setObj({ ...obj, confirm: e.target.value })} />
                    </div>}
                    <div className="mb-3">
                        <CFormLabel htmlFor="fullname">Nama Lengkap <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="text" id="fullname" placeholder="Cth: Jhon Doe" onChange={(e) => setObj({ ...obj, fullname: e.target.value })} value={obj?.fullname} />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="">Role <span className="text-danger">*</span></CFormLabel>
                        <CFormSelect onChange={e => setObj({ ...obj, role: e.target.value })} value={obj?.role || ''}>
                            <option value="admin">Admin</option>
                            <option value="officer">Officer</option>
                            <option value="superadmin">Super Admin</option>
                        </CFormSelect>
                    </div>
                    <div className="form-group mb-2">
                        <CFormLabel htmlFor="">Status <span className="text-danger">*</span></CFormLabel>
                        <CFormSelect onChange={e => setObj({ ...obj, is_active: e.target.value })} value={Number(obj?.is_active) || '0'}>
                            <option value="1">Aktif</option>
                            <option value="0">Tidak Aktif</option>
                        </CFormSelect>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" className="text-white" onClick={() => setModal(false)}>Batal</CButton>
                    <CButton color="success" className="text-white">Simpan</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}
export default Index
