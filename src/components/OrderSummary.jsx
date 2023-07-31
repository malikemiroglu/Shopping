    import React, { useState, useEffect } from "react";
    import swal from 'sweetalert';

    export default function OrderSummary({ item }) {
    const [showAddCoupon, setShowAddCoupon] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const totalPrice = calculateTotal();
        setTotalPrice(totalPrice);

        if(item.length === 0){
            setShowAddCoupon(false);
            setDiscountCode("");
        } else if (discountCode.trim() === "indirim") {
            const discountAmount = totalPrice * 0.1;
            setTotalDiscount(discountAmount);
        } else {
            setTotalDiscount(0);
        }
    }, [item]);

    function confirmCart() {
        setShowAddCoupon(false);
        const confirmed = window.confirm('Alışverişinizi onaylıyor musunuz ?');
        if (confirmed) {
            window.location.reload();
        }
    }

    const applyDiscount = () => {
        if (discountCode.trim() === "indirim") {
            const discountAmount = totalPrice * 0.1;
            setTotalDiscount(discountAmount);
        } else {
            swal("Opps!", "Lütfen geçerli bir indirim kodu giriniz!","error");
            setTotalDiscount(0);
        }
    };

    const calculateTotal = () => {
        let total = 0;
        item.forEach((product) => {
            total += product.price * product.amount;
        });
        return total;
    };

    return (
        <>
        <div className="sticky">
            <div className="card mb-3 ">
                <div className="card-body">
                    <h3 className="card-title mb-4">Sipariş Özeti</h3>
                    <div className="productTotal mb-3">
                        <h6 className="card-subtitle text-body-secondary">
                            Ürünlerin Toplamı
                        </h6>
                        <span>{totalPrice.toFixed(2)} TL</span>
                    </div>
                    <div className="discount pb-3 mb-3  ">
                        <h6 className="indirim card-subtitle text-body-secondary">
                            Toplam İndirim
                        </h6>
                        <span>{`${totalDiscount < 1 ? "0" : `-${totalDiscount.toFixed(2)}`}`} TL</span>
                    </div>
                    <div className="productTotal">
                        <h6 className="card-subtitle text-body-secondary">
                            Ödenecek Toplam
                        </h6>
                        <span>{`${totalPrice > 0 ? `${(totalPrice - totalDiscount).toFixed(2)}` : `${totalPrice}`}`} TL</span>
                    </div>
                </div>
            </div>
            <div className={`changeBtn mb-2 ${showAddCoupon ? "hidden" : ""}`}>
                <div className="d-grid gap-2 discountBtn">
                    <button
                    className="btn"
                    type="button"
                    onClick={() => setShowAddCoupon(true)}
                    >
                        <i className="fa-solid fa-plus"></i>
                        İndirim Kodu Gir
                    </button>
                </div>
            </div>
            <div className={`addCoupon mb-2 ${showAddCoupon ? "" : "hidden"}`}>
                <input
                    className="addCouponInput"
                    placeholder="Kodunuzu Giriniz"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    pattern="[a-z]"
                />
                <button className="addCouponButton" onClick={applyDiscount}>
                    Uygula
                </button>
            </div>
            <div className="d-grid gap-2 confirmCart">
                <button className="btn btn-primary" type="button" onClick={() => confirmCart()}>
                    Sepeti Onayla <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
        </>
    );
}