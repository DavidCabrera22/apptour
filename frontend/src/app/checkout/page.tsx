"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "../../providers/CartProvider";
import { CartItem } from "../../services/api";
import {
  CreditCardIcon,
  UserIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface PaymentError {
  message: string;
  code?: string;
  details?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [paymentError, setPaymentError] = useState<string>("");

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "México",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    }
  }, [cartItems, router]);

  const validateCustomerInfo = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = "Nombre es requerido";
    } else if (customerInfo.name.trim().length < 2) {
      newErrors.name = "Nombre debe tener al menos 2 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(customerInfo.name.trim())) {
      newErrors.name = "Nombre solo puede contener letras y espacios";
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "Email es requerido";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(customerInfo.email.trim())) {
        newErrors.email = "Formato de email inválido";
      }
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Teléfono es requerido";
    } else {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
      if (!phoneRegex.test(customerInfo.phone.trim())) {
        newErrors.phone = "Formato de teléfono inválido (10-15 dígitos)";
      }
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = "Dirección es requerida";
    } else if (customerInfo.address.trim().length < 10) {
      newErrors.address =
        "Dirección debe ser más específica (mínimo 10 caracteres)";
    }

    if (!customerInfo.city.trim()) {
      newErrors.city = "Ciudad es requerida";
    } else if (customerInfo.city.trim().length < 2) {
      newErrors.city = "Ciudad debe tener al menos 2 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentInfo = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar número de tarjeta
    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = "Número de tarjeta es requerido";
    } else {
      const cardNumber = paymentInfo.cardNumber.replace(/\s/g, "");
      if (!/^\d{16}$/.test(cardNumber)) {
        newErrors.cardNumber =
          "Número de tarjeta debe tener exactamente 16 dígitos";
      } else if (!isValidCardNumber(cardNumber)) {
        newErrors.cardNumber = "Número de tarjeta inválido";
      }
    }

    // Validar fecha de vencimiento
    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = "Fecha de vencimiento es requerida";
    } else {
      const [month, year] = paymentInfo.expiryDate.split("/");
      if (!month || !year || month.length !== 2 || year.length !== 2) {
        newErrors.expiryDate = "Formato debe ser MM/YY";
      } else {
        const monthNum = parseInt(month);
        const yearNum = parseInt("20" + year);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        if (monthNum < 1 || monthNum > 12) {
          newErrors.expiryDate = "Mes inválido (01-12)";
        } else if (
          yearNum < currentYear ||
          (yearNum === currentYear && monthNum < currentMonth)
        ) {
          newErrors.expiryDate = "Tarjeta vencida";
        } else if (yearNum > currentYear + 10) {
          newErrors.expiryDate = "Fecha de vencimiento muy lejana";
        }
      }
    }

    // Validar CVV
    if (!paymentInfo.cvv.trim()) {
      newErrors.cvv = "CVV es requerido";
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = "CVV debe tener 3 o 4 dígitos";
    }

    // Validar nombre del titular
    if (!paymentInfo.cardholderName.trim()) {
      newErrors.cardholderName = "Nombre del titular es requerido";
    } else if (paymentInfo.cardholderName.trim().length < 2) {
      newErrors.cardholderName = "Nombre debe tener al menos 2 caracteres";
    } else if (
      !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(paymentInfo.cardholderName.trim())
    ) {
      newErrors.cardholderName = "Nombre solo puede contener letras y espacios";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidCardNumber = (cardNumber: string): boolean => {
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const handleNextStep = () => {
    setPaymentError("");

    if (step === 1 && validateCustomerInfo()) {
      setStep(2);
    } else if (step === 2 && validatePaymentInfo()) {
      handlePayment();
    }
  };

  const handlePayment = async () => {
    if (!validatePaymentInfo()) return;

    setIsLoading(true);
    setPaymentError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const paymentData = {
        amount: getTotalPrice(),
        currency: "USD",
        paymentMethod: "credit_card",
        customerInfo: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
        },
      };

      for (const item of cartItems) {
        const bookingData = {
          packageId: item.packageId,
          selectedDate: item.selectedDate,
          pickupLocation: item.pickupLocation,
          totalAmount: item.price * item.quantity,
          customerInfo: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
          },
        };

        console.log("Creando reserva:", bookingData);
      }

      clearCart();

      setStep(3);
    } catch (error: unknown) {
      console.error("Error processing payment:", error);

      const paymentError = error as PaymentError;

      switch (paymentError.message) {
        case "INSUFFICIENT_FUNDS":
          setPaymentError(
            "Fondos insuficientes. Por favor, verifica tu saldo o usa otra tarjeta."
          );
          break;
        case "CARD_DECLINED":
          setPaymentError(
            "Tarjeta rechazada. Por favor, contacta a tu banco o usa otra tarjeta."
          );
          break;
        case "NETWORK_ERROR":
          setPaymentError(
            "Error de conexión. Por favor, verifica tu internet e intenta de nuevo."
          );
          break;
        default:
          setPaymentError(
            "Error al procesar el pago. Por favor, intenta de nuevo."
          );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-light text-stone-800 mb-4">
              Finalizar Reserva
            </h1>
            <div className="flex items-center justify-center space-x-2 text-sm text-stone-600 flex-wrap">
              <span
                className={`px-3 py-2 rounded-full whitespace-nowrap ${
                  step >= 1 ? "bg-emerald-500 text-white" : "bg-stone-200"
                }`}
              >
                Información
              </span>
              <span className="text-stone-300 hidden sm:inline">—</span>
              <span
                className={`px-3 py-2 rounded-full whitespace-nowrap ${
                  step >= 2 ? "bg-emerald-500 text-white" : "bg-stone-200"
                }`}
              >
                Pago
              </span>
              <span className="text-stone-300 hidden sm:inline">—</span>
              <span
                className={`px-3 py-2 rounded-full whitespace-nowrap ${
                  step >= 3 ? "bg-emerald-500 text-white" : "bg-stone-200"
                }`}
              >
                Confirmación
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-white border border-stone-200 p-8">
                  <h2 className="text-xl font-light mb-6 text-stone-800 flex items-center">
                    <UserIcon className="w-5 h-5 mr-3 text-stone-600" />
                    Información Personal
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            name: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border border-stone-300 focus:border-emerald-500 focus:outline-none transition-colors text-stone-900 bg-white ${
                          errors.name ? "border-red-400" : ""
                        }`}
                        placeholder="Tu nombre completo"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            email: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border border-stone-300 focus:border-emerald-500 focus:outline-none transition-colors text-stone-900 bg-white ${
                          errors.email ? "border-red-400" : ""
                        }`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border border-stone-300 focus:border-emerald-500 focus:outline-none transition-colors text-stone-900 bg-white ${
                          errors.phone ? "border-red-400" : ""
                        }`}
                        placeholder="+52 123 456 7890"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        País *
                      </label>
                      <select
                        value={customerInfo.country}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            country: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-stone-300 focus:border-stone-500 focus:outline-none transition-colors text-stone-900 bg-white"
                      >
                        <option value="México">México</option>
                        <option value="Estados Unidos">Estados Unidos</option>
                        <option value="Canadá">Canadá</option>
                        <option value="España">España</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Dirección *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            address: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border border-stone-300 focus:border-stone-500 focus:outline-none transition-colors text-stone-900 bg-white ${
                          errors.address ? "border-red-400" : ""
                        }`}
                        placeholder="Calle, número, colonia"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.city}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            city: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border border-stone-300 focus:border-stone-500 focus:outline-none transition-colors text-stone-900 bg-white ${
                          errors.city ? "border-red-400" : ""
                        }`}
                        placeholder="Tu ciudad"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white border border-stone-200 p-8">
                  <h2 className="text-xl font-light mb-6 text-stone-800 flex items-center">
                    <CreditCardIcon className="w-5 h-5 mr-3 text-stone-600" />
                    Información de Pago
                  </h2>

                  {paymentError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-red-800 font-medium">
                          Error en el pago
                        </h4>
                        <p className="text-red-700 text-sm mt-1">
                          {paymentError}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Número de Tarjeta *
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardNumber: formatCardNumber(e.target.value),
                          })
                        }
                        className={`w-full px-4 py-3 border border-stone-300 focus:border-stone-500 focus:outline-none transition-colors text-stone-900 bg-white ${
                          errors.cardNumber ? "border-red-400" : ""
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Fecha de Vencimiento *
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: formatExpiryDate(e.target.value),
                          })
                        }
                        className={`w-full px-4 py-3 border border-stone-300 focus:border-stone-500 focus:outline-none transition-colors text-stone-900 bg-white ${
                          errors.expiryDate ? "border-red-400" : ""
                        }`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className={`w-full px-4 py-3 border border-stone-300 focus:border-stone-500 focus:outline-none transition-colors text-stone-900 bg-white ${
                          errors.cvv ? "border-red-400" : ""
                        }`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cvv}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Nombre del Titular *
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardholderName}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardholderName: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-3 border border-stone-300 focus:border-stone-500 focus:outline-none transition-colors text-stone-900 bg-white ${
                          errors.cardholderName ? "border-red-400" : ""
                        }`}
                        placeholder="Nombre como aparece en la tarjeta"
                      />
                      {errors.cardholderName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cardholderName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white border border-stone-200 p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-light text-stone-800 mb-4">
                    ¡Reserva Confirmada!
                  </h2>
                  <p className="text-stone-600 mb-8">
                    Tu reserva ha sido procesada exitosamente. Recibirás un
                    email de confirmación en breve.
                  </p>
                  <button
                    onClick={() => router.push("/")}
                    className="bg-stone-800 text-white px-8 py-3 hover:bg-stone-700 transition-colors font-medium"
                  >
                    Volver al Inicio
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-stone-200 p-6 sticky top-24">
                <h3 className="text-lg font-light mb-6 text-stone-800">
                  Resumen del Pedido
                </h3>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item: CartItem) => (
                    <div
                      key={`${item.packageId}-${item.selectedDate}`}
                      className="flex items-start space-x-3 pb-4 border-b border-stone-100 last:border-b-0"
                    >
                      <Image
                        src={item.packageImage}
                        alt={item.packageName}
                        width={60}
                        height={60}
                        className="object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-stone-900 mb-1">
                          {item.packageName}
                        </h4>
                        <p className="text-sm text-stone-600 mb-1">
                          {new Date(item.selectedDate).toLocaleDateString(
                            "es-ES"
                          )}
                        </p>
                        <p className="text-sm text-stone-600 mb-1">
                          {item.pickupLocation}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-stone-600">
                            Cantidad: {item.quantity}
                          </span>
                          <span className="font-medium text-stone-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-stone-800">
                      Total:
                    </span>
                    <span className="text-xl font-medium text-stone-900">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>

                {step < 3 && (
                  <div className="space-y-3">
                    {step > 1 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="w-full bg-stone-100 text-stone-700 py-3 hover:bg-stone-200 transition-colors font-medium"
                      >
                        Anterior
                      </button>
                    )}
                    <button
                      onClick={handleNextStep}
                      disabled={isLoading}
                      className="w-full bg-emerald-500 text-white py-3 hover:bg-emerald-600 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {isLoading
                        ? "Procesando..."
                        : step === 1
                        ? "Continuar"
                        : "Procesar Pago"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
