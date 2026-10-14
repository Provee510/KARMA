import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Copy,
  FileImage,
  LockKeyhole,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  Upload,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/useCart";
import { formatPrice } from "../../data/products";

const BANK_DETAILS = {
  bankName: "[PLACEHOLDER — bank name]",
  accountName: "[PLACEHOLDER — account name]",
  accountNumber: "[PLACEHOLDER — account number]",
  currency: "NGN",
  instructions:
    "Include your order number in the transfer reference, if supported.",
};

const MAX_RECEIPT_SIZE = 10 * 1024 * 1024;

const ALLOWED_RECEIPT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

function Cart() {
  const navigate = useNavigate();

  const {
    items,
    itemCount,
    subtotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [detailsReviewed, setDetailsReviewed] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(7);
  const [receiptFile, setReceiptFile] = useState(null);
  const receiptPreviewUrl = useMemo(() => {
  if (!receiptFile) return "";

  return URL.createObjectURL(receiptFile);
}, [receiptFile]);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    phone: "",
  });

  

// Clean up the temporary receipt preview URL.
useEffect(() => {
  if (!receiptPreviewUrl) return undefined;

  return () => {
    URL.revokeObjectURL(receiptPreviewUrl);
  };
}, [receiptPreviewUrl]);


  // Return to the storefront after the pending-verification countdown.
  useEffect(() => {
    if (!paymentSubmitted) return undefined;

    if (countdown <= 0) {
      navigate("/shop");
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [paymentSubmitted, countdown, navigate]);

  const updateField = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCheckout = () => {
    setCheckoutOpen(true);
    setDetailsReviewed(false);
    setPaymentOpen(false);
    setPaymentSubmitted(false);
    scrollToTop();
  };

  const handleReviewDetails = (event) => {
    event.preventDefault();
    setDetailsReviewed(true);
    scrollToTop();
  };

  const handleReceiptChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_RECEIPT_TYPES.includes(file.type)) {
      toast.error("Choose a JPG, PNG, WEBP, or PDF receipt.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_RECEIPT_SIZE) {
      toast.error("Your receipt must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    setReceiptFile(file);
  };

  const handleRemoveReceipt = () => {
    setReceiptFile(null);

    // Reset the file input so the same file can be selected again.
    const fileInput = document.getElementById("payment-receipt");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handlePaymentConfirmation = () => {
    // This records a customer attestation in the current browser session.
    // It does not verify payment or save an order to a backend.
    setPaymentSubmitted(true);
    setCountdown(7);
    scrollToTop();
  };

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
      toast.success("Account number copied.");
    } catch {
      toast.error("Copy unavailable. Please select the account number.");
    }
  };

  const inputClass =
    "mt-2 w-full border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-violet-600 focus:ring-1 focus:ring-violet-600";

  const labelClass = "block text-sm font-medium text-neutral-800";

  const getItemKey = (item) =>
    `${item.id}-${item.size || ""}-${item.color || ""}`;

  const renderOrderItems = () => (
    <div className="space-y-5">
      {items.map((item) => (
        <div
          key={getItemKey(item)}
          className="flex items-center gap-4"
        >
          <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-neutral-100">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-400">
                <ShoppingBag size={20} />
              </div>
            )}

            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-950 px-1 text-[10px] text-white">
              {item.quantity}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{item.name}</p>

            {item.size && (
              <p className="mt-1 text-xs text-neutral-500">
                Size: {item.size}
              </p>
            )}

            {item.color && (
              <p className="mt-1 text-xs text-neutral-500">
                Color: {item.color}
              </p>
            )}
          </div>

          <p className="shrink-0 text-sm font-medium">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      ))}
    </div>
  );

  const renderOrderSummary = () => (
    <aside className="h-fit border border-neutral-200 p-6 sm:p-8 lg:sticky lg:top-8 lg:self-start">
      <h2 className="mb-6 text-lg font-semibold">Order summary</h2>

      {renderOrderItems()}

      <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-neutral-500">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-neutral-500">Shipping</span>
          <span className="text-right text-neutral-500">
            Calculated separately
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-neutral-500">Taxes</span>
          <span className="text-right text-neutral-500">
            If applicable
          </span>
        </div>

        <div className="flex justify-between gap-4 border-t border-neutral-200 pt-4 text-base font-semibold">
          <span>Subtotal due</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-neutral-500">
        Final shipping charges and any applicable taxes have not been
        calculated by this checkout.
      </p>
    </aside>
  );

  const renderContactCard = () => (
    <div className="border border-neutral-200 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Contact information</h2>

        {!paymentSubmitted && (
          <button
            type="button"
            onClick={() => {
              setPaymentOpen(false);
              setDetailsReviewed(false);
              scrollToTop();
            }}
            className="text-sm underline underline-offset-4 hover:text-violet-700"
          >
            Edit
          </button>
        )}
      </div>

      <p className="mt-4 break-words text-sm text-neutral-600">
        {formData.email}
      </p>

      {formData.phone && (
        <p className="mt-2 text-sm text-neutral-600">
          {formData.phone}
        </p>
      )}
    </div>
  );

  const renderShippingCard = () => (
    <div className="border border-neutral-200 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Shipping address</h2>

        {!paymentSubmitted && (
          <button
            type="button"
            onClick={() => {
              setPaymentOpen(false);
              setDetailsReviewed(false);
              scrollToTop();
            }}
            className="text-sm underline underline-offset-4 hover:text-violet-700"
          >
            Edit
          </button>
        )}
      </div>

      <div className="mt-4 space-y-1 text-sm leading-6 text-neutral-600">
        <p>
          {formData.firstName} {formData.lastName}
        </p>
        <p>{formData.address}</p>

        {formData.apartment && <p>{formData.apartment}</p>}

        <p>
          {formData.city}, {formData.state} {formData.postalCode}
        </p>

        <p>{formData.country}</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            to="/shop"
            className="text-2xl font-black tracking-[0.18em]"
          >
            KARMA <span className="text-violet-600">CAN</span>
          </Link>

          {!paymentSubmitted && (
            <Link
              to="/shop/products"
              className="text-sm font-medium transition hover:text-violet-600"
            >
              Continue shopping
            </Link>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
        {paymentSubmitted ? (
          <section className="mx-auto max-w-2xl py-8 text-center sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 text-violet-700">
              <Clock3 size={30} />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-violet-600">
              Payment status
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Payment pending verification.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-600">
              Your payment confirmation has been recorded in this session.
              Your transfer has not been verified, and your order is not
              confirmed as paid. The transfer must be verified separately
              before payment can be marked as complete.
            </p>

            <div className="mt-8 border border-violet-200 bg-violet-50 p-6 text-left">
              <div className="flex items-start gap-3">
                <LockKeyhole
                  size={20}
                  className="mt-0.5 shrink-0 text-violet-700"
                />

                <div>
                  <h2 className="font-semibold">
                    Awaiting payment verification
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    This storefront does not yet send confirmation emails
                    or store payment submissions on a server. No real
                    notification will be sent by this page.
                  </p>
                </div>
              </div>
            </div>

            {receiptFile && (
              <p className="mt-5 break-words text-sm text-neutral-500">
                Receipt selected in this browser: {receiptFile.name}
              </p>
            )}

            <div className="mt-8">
              <p className="text-sm text-neutral-500">
                Returning to the shop in
              </p>

              <p
                aria-live="polite"
                className="mt-2 text-4xl font-semibold tabular-nums"
              >
                {countdown}
              </p>

              <p className="mt-2 text-xs text-neutral-400">seconds</p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-8 inline-flex items-center justify-center gap-2 bg-neutral-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Return to shop now
              <ArrowRight size={16} />
            </button>
          </section>
        ) : checkoutOpen ? (
          <>
            <button
              type="button"
              onClick={() => {
                if (paymentOpen) {
                  setPaymentOpen(false);
                } else if (detailsReviewed) {
                  setDetailsReviewed(false);
                } else {
                  setCheckoutOpen(false);
                }

                scrollToTop();
              }}
              className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 transition hover:text-violet-700"
            >
              <ArrowLeft size={16} />

              {paymentOpen
                ? "Back to details review"
                : detailsReviewed
                  ? "Edit shipping details"
                  : "Back to bag"}
            </button>

            <div className="mb-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-violet-600">
                {paymentOpen
                  ? "Bank transfer"
                  : detailsReviewed
                    ? "Details review"
                    : "Secure checkout"}
              </p>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {paymentOpen
                  ? "Complete your transfer."
                  : detailsReviewed
                    ? "Review your details."
                    : "Your next move."}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
                {paymentOpen
                  ? "Transfer the order total using the account details below, then optionally attach your receipt."
                  : detailsReviewed
                    ? "Check your contact and shipping information before moving to payment."
                    : "Enter your contact and shipping details to prepare your order."}
              </p>
            </div>

            {/* On large screens, only this left column scrolls independently.
                The order summary remains sticky on the right. On smaller
                screens, the page scrolls normally. */}
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
              <section className="min-w-0 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-3">
                {paymentOpen ? (
                  <div className="space-y-8">
                    {renderContactCard()}
                    {renderShippingCard()}

                    <section className="border border-neutral-200 p-6 sm:p-8">
                      <div className="flex items-start gap-3">
                        <LockKeyhole
                          size={20}
                          className="mt-0.5 shrink-0 text-violet-700"
                        />

                        <div>
                          <h2 className="text-lg font-semibold">
                            Bank transfer details
                          </h2>

                          <p className="mt-2 text-sm leading-6 text-neutral-600">
                            Make your transfer using the details shown
                            below. Check the account information carefully
                            before sending money.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 space-y-5 bg-neutral-50 p-5 sm:p-6">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-neutral-500">
                            Bank name
                          </p>
                          <p className="mt-1 break-words font-semibold">
                            {BANK_DETAILS.bankName}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-neutral-500">
                            Account name
                          </p>
                          <p className="mt-1 break-words font-semibold">
                            {BANK_DETAILS.accountName}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-neutral-500">
                            Account number
                          </p>

                          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                            <p className="break-all text-lg font-semibold tracking-wide">
                              {BANK_DETAILS.accountNumber}
                            </p>

                            <button
                              type="button"
                              onClick={copyAccountNumber}
                              className="inline-flex items-center gap-2 text-sm font-medium text-violet-700 hover:text-violet-900"
                            >
                              <Copy size={15} />
                              Copy
                            </button>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wider text-neutral-500">
                            Currency
                          </p>
                          <p className="mt-1 font-semibold">
                            {BANK_DETAILS.currency}
                          </p>
                        </div>

                        <div className="border-t border-neutral-200 pt-5">
                          <p className="text-xs uppercase tracking-wider text-neutral-500">
                            Transfer amount
                          </p>

                          <p className="mt-1 text-2xl font-semibold">
                            {formatPrice(subtotal)}
                          </p>

                          <p className="mt-2 text-xs leading-5 text-neutral-500">
                            This amount is the current cart subtotal.
                            Shipping and applicable taxes are not yet
                            calculated, so confirm the final amount before
                            making a transfer.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 border-l-2 border-violet-500 pl-4">
                        <p className="text-sm font-semibold">
                          Payment instructions
                        </p>

                        <p className="mt-2 text-sm leading-6 text-neutral-600">
                          {BANK_DETAILS.instructions}
                        </p>
                      </div>

                      <div className="mt-6 border border-amber-200 bg-amber-50 p-4">
                        <p className="text-sm font-semibold text-amber-950">
                          Important: verify the bank details
                        </p>

                        <p className="mt-2 text-sm leading-6 text-amber-900">
                          The account details above are placeholders and
                          must be replaced with your verified business
                          banking information before this checkout is used
                          for real payments. Do not transfer money to
                          placeholder details.
                        </p>
                      </div>
                    </section>

                    <section className="border border-neutral-200 p-6 sm:p-8">
                      <div className="flex items-start gap-3">
                        <FileImage
                          size={21}
                          className="mt-0.5 shrink-0 text-violet-700"
                        />

                        <div>
                          <h2 className="text-lg font-semibold">
                            Upload payment receipt
                          </h2>

                          <p className="mt-2 text-sm leading-6 text-neutral-600">
                            If you have completed the transfer, select a
                            screenshot, photo, or PDF of your receipt to
                            preview it here. You can also continue without
                            attaching a receipt.
                          </p>
                        </div>
                      </div>

                      <label
                        htmlFor="payment-receipt"
                        className="mt-6 flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-neutral-300 px-5 py-8 text-center transition hover:border-violet-500"
                      >
                        <Upload size={25} className="text-violet-700" />

                        <span className="mt-3 text-sm font-semibold">
                          Choose a receipt
                        </span>

                        <span className="mt-2 text-xs text-neutral-500">
                          JPG, PNG, WEBP, or PDF · Maximum 10 MB
                        </span>

                        <input
                          id="payment-receipt"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,application/pdf"
                          onChange={handleReceiptChange}
                          className="sr-only"
                        />
                      </label>

                      {receiptFile && receiptPreviewUrl && (
                        <div className="mt-5 border border-neutral-200 p-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="break-words text-sm font-medium">
                                {receiptFile.name}
                              </p>

                              <p className="mt-1 text-xs text-neutral-500">
                                {(receiptFile.size / 1024 / 1024).toFixed(2)}{" "}
                                MB · Local preview only
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={handleRemoveReceipt}
                              className="text-sm text-neutral-500 underline underline-offset-4 hover:text-red-600"
                            >
                              Remove
                            </button>
                          </div>

                          {receiptFile.type.startsWith("image/") ? (
                            <img
                              src={receiptPreviewUrl}
                              alt="Selected payment receipt preview"
                              className="mt-4 max-h-96 w-full bg-neutral-50 object-contain"
                            />
                          ) : (
                            <iframe
                              src={receiptPreviewUrl}
                              title="Selected PDF receipt preview"
                              className="mt-4 h-96 w-full border border-neutral-200"
                            />
                          )}

                          <p className="mt-3 text-xs leading-5 text-neutral-500">
                            This file has not been uploaded or sent to KARMA
                            CAN. It will not be retained by a backend.
                          </p>
                        </div>
                      )}
                    </section>

                    <div className="border border-neutral-200 p-5 sm:p-6">
                      <h2 className="font-semibold">
                        Before you continue
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        By choosing “I've made the payment,” you are
                        confirming that you have initiated or completed a
                        transfer. This does not verify receipt of funds or
                        place a confirmed paid order.
                      </p>

                      <button
                        type="button"
                        onClick={handlePaymentConfirmation}
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-neutral-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-700"
                      >
                        I've made the payment
                        <ArrowRight size={16} />
                      </button>

                      <p className="mt-4 text-center text-xs leading-5 text-neutral-500">
                        Your payment status will remain pending
                        verification.
                      </p>
                    </div>
                  </div>
                ) : detailsReviewed ? (
                  <div className="space-y-8">
                    {renderContactCard()}
                    {renderShippingCard()}

                    <div className="border border-violet-200 bg-violet-50 p-6 sm:p-8">
                      <div className="flex items-start gap-3">
                        <LockKeyhole
                          size={20}
                          className="mt-0.5 shrink-0 text-violet-700"
                        />

                        <div>
                          <h2 className="font-semibold">
                            Bank transfer payment
                          </h2>

                          <p className="mt-2 text-sm leading-6 text-neutral-600">
                            The next step shows the configured bank
                            transfer details and lets you select a payment
                            receipt. Payment remains unverified until
                            checked separately.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentOpen(true);
                        scrollToTop();
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 bg-neutral-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-700 sm:w-auto"
                    >
                      Continue to bank transfer
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleReviewDetails}
                    className="space-y-10"
                  >
                    <section>
                      <div className="mb-5 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center bg-neutral-950 text-sm font-semibold text-white">
                          01
                        </span>

                        <h2 className="text-xl font-semibold">
                          Contact information
                        </h2>
                      </div>

                      <label className={labelClass}>
                        Email address
                        <input
                          className={inputClass}
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={updateField}
                          placeholder="you@example.com"
                          autoComplete="email"
                          required
                        />
                      </label>

                      <label className={`${labelClass} mt-5`}>
                        Phone number{" "}
                        <span className="font-normal text-neutral-400">
                          (optional)
                        </span>

                        <input
                          className={inputClass}
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={updateField}
                          placeholder="Your phone number"
                          autoComplete="tel"
                        />
                      </label>
                    </section>

                    <section>
                      <div className="mb-5 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center bg-neutral-950 text-sm font-semibold text-white">
                          02
                        </span>

                        <h2 className="text-xl font-semibold">
                          Shipping address
                        </h2>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className={labelClass}>
                          First name
                          <input
                            className={inputClass}
                            name="firstName"
                            value={formData.firstName}
                            onChange={updateField}
                            placeholder="First name"
                            autoComplete="given-name"
                            required
                          />
                        </label>

                        <label className={labelClass}>
                          Last name
                          <input
                            className={inputClass}
                            name="lastName"
                            value={formData.lastName}
                            onChange={updateField}
                            placeholder="Last name"
                            autoComplete="family-name"
                            required
                          />
                        </label>

                        <label className={`${labelClass} sm:col-span-2`}>
                          Street address
                          <input
                            className={inputClass}
                            name="address"
                            value={formData.address}
                            onChange={updateField}
                            placeholder="Street address"
                            autoComplete="street-address"
                            required
                          />
                        </label>

                        <label className={`${labelClass} sm:col-span-2`}>
                          Apartment, suite, etc.{" "}
                          <span className="font-normal text-neutral-400">
                            (optional)
                          </span>

                          <input
                            className={inputClass}
                            name="apartment"
                            value={formData.apartment}
                            onChange={updateField}
                            placeholder="Apartment, suite, unit"
                            autoComplete="address-line2"
                          />
                        </label>

                        <label className={labelClass}>
                          City
                          <input
                            className={inputClass}
                            name="city"
                            value={formData.city}
                            onChange={updateField}
                            placeholder="City"
                            autoComplete="address-level2"
                            required
                          />
                        </label>

                        <label className={labelClass}>
                          State / region
                          <input
                            className={inputClass}
                            name="state"
                            value={formData.state}
                            onChange={updateField}
                            placeholder="State or region"
                            autoComplete="address-level1"
                            required
                          />
                        </label>

                        <label className={labelClass}>
                          Postal code
                          <input
                            className={inputClass}
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={updateField}
                            placeholder="Postal code"
                            autoComplete="postal-code"
                            required
                          />
                        </label>

                        <label className={labelClass}>
                          Country
                          <select
                            className={inputClass}
                            name="country"
                            value={formData.country}
                            onChange={updateField}
                            autoComplete="country-name"
                            required
                          >
                            <option value="Nigeria">Nigeria</option>
                            <option value="United States">
                              United States
                            </option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="Mexico">Mexico</option>
                            <option value="Canada">Canada</option>
                            <option value="Other">Other</option>
                          </select>
                        </label>
                      </div>
                    </section>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 bg-neutral-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-700 sm:w-auto"
                    >
                      Review shipping details
                      <ArrowRight size={16} />
                    </button>

                    <p className="text-xs leading-5 text-neutral-500">
                      Guest checkout — no account required. Payment and
                      order processing are not connected to a backend yet.
                    </p>
                  </form>
                )}
              </section>

              {renderOrderSummary()}
            </div>
          </>
        ) : items.length === 0 ? (
          <section className="mx-auto max-w-xl py-16 text-center sm:py-24">
            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-neutral-100">
              <ShoppingBag size={27} />
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight">
              Your bag is taking a break.
            </h1>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Nothing in your bag just yet. Explore the collection and
              find your next everyday essential.
            </p>

            <Link
              to="/shop/products"
              className="mt-8 inline-flex items-center gap-2 bg-neutral-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Explore the collection
              <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          <>
            <div className="mb-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-violet-600">
                Your selection
              </p>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Your bag.
              </h1>

              <p className="mt-3 text-sm text-neutral-500">
                {itemCount} {itemCount === 1 ? "item" : "items"} ready for
                their next chapter.
              </p>
            </div>

            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
              <section className="min-w-0">
                <div className="border-t border-neutral-200">
                  {items.map((item) => (
                    <article
                      key={getItemKey(item)}
                      className="flex gap-4 border-b border-neutral-200 py-6 sm:gap-6"
                    >
                      <Link
                        to={`/shop/products/${item.id}`}
                        className="h-32 w-24 shrink-0 overflow-hidden bg-neutral-100 sm:h-40 sm:w-32"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-neutral-400">
                            <ShoppingBag size={24} />
                          </div>
                        )}
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              to={`/shop/products/${item.id}`}
                              className="font-semibold transition hover:text-violet-700"
                            >
                              {item.name}
                            </Link>

                            {item.size && (
                              <p className="mt-1 text-xs text-neutral-500">
                                Size: {item.size}
                              </p>
                            )}

                            {item.color && (
                              <p className="mt-1 text-xs text-neutral-500">
                                Color: {item.color}
                              </p>
                            )}
                          </div>

                          <p className="shrink-0 text-sm font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                          <div className="inline-flex items-center border border-neutral-300">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1,
                                  item.size,
                                  item.color
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="p-2 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="min-w-9 text-center text-sm">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.name}`}
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  item.size,
                                  item.color
                                )
                              }
                              className="p-2 transition hover:bg-neutral-100"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(
                                item.id,
                                item.size,
                                item.color
                              )
                            }
                            className="inline-flex items-center gap-2 text-xs text-neutral-500 transition hover:text-red-600"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <Link
                  to="/shop/products"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition hover:text-violet-700"
                >
                  <ArrowLeft size={15} />
                  Continue shopping
                </Link>
              </section>

              <aside className="h-fit border border-neutral-200 p-6 sm:p-8 lg:sticky lg:top-8 lg:self-start">
                <h2 className="text-lg font-semibold">Order summary</h2>

                <div className="mt-6 space-y-4 border-b border-neutral-200 pb-6 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-neutral-500">Subtotal</span>
                    <span className="font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="text-right text-neutral-500">
                      Calculated separately
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-neutral-500">Taxes</span>
                    <span className="text-right text-neutral-500">
                      If applicable
                    </span>
                  </div>
                </div>

                <div className="flex justify-between gap-4 py-5 text-base font-semibold">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="inline-flex w-full items-center justify-center gap-2 bg-neutral-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  Proceed to checkout
                  <ArrowRight size={16} />
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-neutral-500">
                  <LockKeyhole size={14} />
                  Guest checkout — no account required
                </div>

                <div className="mt-5 flex items-start gap-3 border-t border-neutral-200 pt-5">
                  <Truck
                    size={18}
                    className="mt-0.5 shrink-0 text-violet-700"
                  />

                  <p className="text-xs leading-5 text-neutral-500">
                    Shipping and delivery arrangements will be confirmed
                    separately.
                  </p>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-semibold tracking-[0.18em] text-neutral-800">
            KARMA CAN
          </p>

          <p>Everyday essentials. Different energy.</p>
        </div>
      </footer>
    </main>
  );
}

export default Cart;