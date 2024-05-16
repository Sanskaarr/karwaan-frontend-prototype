'use client'
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import styles from '../products/my-account/style.module.css'
import { ClipLoader } from 'react-spinners';
import { useAppSelector } from "@/redux/hooks";
import withAuth from "@/component/RoutesProtect/withAuth";
import { useAddress } from "@/hooks/useAddress";

function AddressForm() {
    if (typeof window !== 'undefined') {
        var token = JSON.parse(localStorage.getItem('user') as string)?.token;
        var _id = JSON.parse(localStorage.getItem('user') as string)?._id;

    }


    type formType = {
        houseNumber: string,
        buildingName: string,
        country: string,
        state: string,
        city: string,
        street: string,
        pin: string,

    }
    const [addressId, setAddressId] = useState<string>("")
    const [formData, setFormData] = useState<formType>({
        houseNumber: "",
        buildingName: "",
        country: "",
        state: "",
        city: "",
        street: "",
        pin: "",
        
    });
    // calling apis
    const { handleAddAddress, handleGetAddress,handleUpdateAddress,handleDeleteAddress } = useAddress({ userId: _id, token: token, address: formData })
    useEffect(() => {
        (async () => {
            const data = await handleGetAddress();
            if (data?.length) {
                setFormData( {
                    houseNumber: data[0].houseNumber,
                    buildingName: data[0].buildingName,
                    country: data[0].country,
                    state: data[0].state,
                    city: data[0].city,
                    street: data[0].street,
                    pin: data[0].pin,
                })
                setAddressId(data[0]._id)
            }
        })()
    }, []);

    const [modalOpen, setModalOpen] = useState<any>(false);

    // delete open and close logic
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);


    // const {firstName,lastName,email}=useAppSelector((state)=>state.user.user);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    //   setBackdrop("blur")

// loading
const isAddAddressLoading: boolean = useAppSelector((state: any) => state.addressRequest.addAddress.loading);
const isUpdateAddressLoading: boolean = useAppSelector((state: any) => state.addressRequest.changeAddress.loading);
const isDeleteAddressLoading: boolean = useAppSelector((state: any) => state.addressRequest.deleteAddress.loading);

    return (

        <>
            <h1 className={styles.heading}>my Address</h1>
            <div className={styles.myAccount} style={{ gridTemplateColumns: "1fr", justifyContent: "center" }} >

                {/* change fields */}
                <form className={styles.myAccountForm} style={{ justifySelf: "center", maxWidth: "550px" }} >
                    {/* house number */}
                    <div className={styles.userName}>
                        <input className={styles.inputField} type="text" name='houseNumber' id='houseNumber'
                            value={formData.houseNumber}
                            onChange={(e) => {
                                setFormData({ ...formData, houseNumber: e.target.value })
                            }} required />
                        <label className={`${styles.nameLable}`}>House Number</label>
                    </div>
                    {/* building number */}
                    <div className={styles.userName}>
                        <input className={styles.inputField} type="text" name='buildingName' id='buildingName'
                            value={formData.buildingName}
                            onChange={(e) => {
                                setFormData({ ...formData, buildingName: e.target.value })
                            }} required />
                        <label className={`${styles.nameLable}`}>Building Name</label>
                    </div>
                    {/* country */}
                    <div className={styles.userName}>
                        <input className={styles.inputField} type="text" name='country' id='country'
                            value={formData.country}
                            onChange={(e) => {
                                setFormData({ ...formData, country: e.target.value })
                            }} required />
                        <label className={`${styles.nameLable}`}>Country</label>
                    </div>
                    {/* state */}
                    <div className={styles.userName}>
                        <input className={styles.inputField} type="text" name='state' id='state'
                            value={formData.state}
                            onChange={(e) => {
                                setFormData({ ...formData, state: e.target.value })
                            }} required />
                        <label className={`${styles.nameLable}`}>State</label>
                    </div>
                    {/* city */}
                    <div className={styles.userName}>
                        <input className={styles.inputField} type="text" name='city' id='city'
                            value={formData.city}
                            onChange={(e) => {
                                setFormData({ ...formData, city: e.target.value })
                            }} required />
                        <label className={`${styles.nameLable}`}>city</label>
                    </div>
                    {/*  street */}
                    <div className={styles.userName}>
                        <input className={styles.inputField} type="text" name='street' id='street'
                            value={formData.street}
                            onChange={(e) => {
                                setFormData({ ...formData, street: e.target.value })
                            }} required />
                        <label className={`${styles.nameLable}`}>street</label>
                    </div>
                    {/* pin */}
                    <div className={styles.userName}>
                        <input className={styles.inputField} type="number" name='pin' id='pin'
                            value={formData.pin}
                            onChange={(e) => {
                                setFormData({ ...formData, pin: e.target.value })
                            }} required />
                        <label className={`${styles.nameLable}`}>pin</label>
                    </div>
                    {!addressId ?
                     <button className={styles.submitButton}
                        onClick={handleAddAddress}
                        style={
                            !isAddAddressLoading ?
                                { background: "black", pointerEvents: "all" } :
                                { background: "gray", pointerEvents: "none" }}>
                        {!isAddAddressLoading ? "Add address" :
                            <div >
                                <ClipLoader color="white" size={15} speedMultiplier={0.5} />
                            </div>}
                    </button> :
                        <div className={styles.addressBtn}>
                        <button className={styles.submitButton}

                                onClick={(e)=>handleUpdateAddress(e,addressId!)}
                            style={
                            (  (
                                formData.houseNumber.length&&
                                formData.buildingName.length&&
                                formData.country.length&&
                                formData.state.length &&
                                formData.city.length &&
                                formData.street.length&&
                                formData.pin.length         
                            )&&!isUpdateAddressLoading) ?
                                    { background: "black", pointerEvents: "all" } :
                                    { background: "gray", pointerEvents: "none" }}>
                            {!isUpdateAddressLoading ? "Update address" :
                                
                                    <ClipLoader color="white" size={15} speedMultiplier={0.5} />
                                    
                                }
                        </button>
                        <Button className={styles.submitButton} style={{ width: "50px", height: "140px" }} onPress={onOpen}>Delete address</Button>
                            <div style={!isOpen ? { display: "none" } : { display: "flex" }} className={styles.deletePopUpBg} onClick={close}>
                                <Modal

                                    isOpen={isOpen}
                                    onOpenChange={onOpenChange}

                                >
                                    <ModalContent className={styles.deletePopUp}>
                                        {(onClose) => (
                                            <div >
                                                <ModalHeader className={styles.modalTittle}>This action cannot be undone.</ModalHeader>
                                                {/* <ModalBody>
                                                    <p>You will lose access to all your account, teams, credits, dataset, models, and plans. If you have an active subscription you will lose access to it. There are no refunds.SavePlease make sure you are certain about this action.</p>
                                                </ModalBody> */}
                                                <ModalFooter className={styles.deletePopUpButtons}>
                                                    <Button className={styles.deletePopUpButton} variant="light" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                    <Button className={styles.deletePopUpButton} onPress={onClose} onClick={(e)=>handleDeleteAddress(e,addressId!)}>
                                                        {isDeleteAddressLoading ?
                                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                                <ClipLoader color="white" cssOverride={{}} size={15} speedMultiplier={0.5} />
                                                            </div> :
                                                            "Delete"
                                                        }
                                                    </Button>
                                                </ModalFooter>
                                            </div>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                                </div>}
                </form>
            </div>

        </ >
    )
}

export default withAuth(AddressForm);