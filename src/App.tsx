import { FormEvent, useState } from "react"

type Screen = "sign-in" | "welcome" | "outlet" | "order" | "review" | "done"
type Language = "English" | "हिन्दी"
type PaymentMethod = "Cash" | "UPI" | "Skip"
type Product = {
  id: string
  name: string
  size: string
  price: number
  quantity: number
  icon: string
  packColor: string
  scheme?: { threshold: number free: number }
}

const initialProducts: Product[] = [
  {
    id: "mango",
    name: "Mango drink",
    size: "200 ml",
    price: 20,
    quantity: 20,
    icon: "/assets/3fba3.svg",
    packColor: "#f3b964",
    scheme: { threshold: 10, free: 1 },
  },
  {
    id: "crackers",
    name: "Masala crackers",
    size: "60 g",
    price: 30,
    quantity: 8,
    icon: "/assets/674dd.svg",
    packColor: "#eaf3e8",
    scheme: { threshold: 10, free: 1 },
  },
  {
    id: "peanuts",
    name: "Roasted peanuts",
    size: "50 g",
    price: 25,
    quantity: 4,
    icon: "/assets/edc79.svg",
    packColor: "#f8e8bb",
  },
  {
    id: "coconut",
    name: "Coconut water",
    size: "200 ml",
    price: 40,
    quantity: 4,
    icon: "/assets/674dd.svg",
    packColor: "#eaf3e8",
  },
]

const assets = {
  phone: "/assets/8f171.svg",
  wifi: "/assets/8c0a9.svg",
  headset: "/assets/09aff.svg",
  store: "/assets/fac75.svg",
  reuse: "/assets/16df0.svg",
  scheme: "/assets/a8245.svg",
  wallet: "/assets/502b9.svg",
  cloudCheck: "/assets/3bd44.svg",
  timer: "/assets/2614e.svg",
  cloudOff: "/assets/a9ab3.svg",
  back: "/assets/5e3a2.svg",
  globe: "/assets/99974.svg",
  pin: "/assets/220d9.svg",
  circleCheck: "/assets/7686f.svg",
  search: "/assets/b5022.svg",
  minus: "/assets/e5eb9.svg",
  plus: "/assets/56b0c.svg",
  selected: "/assets/7870d.svg",
  alert: "/assets/51e11.svg",
  done: "/assets/6d0cb.svg",
  doneDouble: "/assets/fceb6.svg",
  savedOffline: "/assets/38de9.svg",
  packageCheck: "/assets/dfdf4.svg",
  banknote: "/assets/532d0.svg",
  file: "/assets/1c704.svg",
}

function Icon({ src, size }: { src: string size: number }) {
  return <img alt="" aria-hidden="true" src={src} width={size} height={size} />
}

function LanguageSwitch({
  language,
  onChange,
}: {
  language: Language
  onChange: (language: Language) => void
}) {
  return (
    <div className="language-switch" aria-label="Choose language">
      {(["English", "हिन्दी"] as const).map((option) => (
        <button
          className={language === option ? "active" : ""}
          key={option}
          onClick={() => onChange(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function BrandHeader({
  language,
  onLanguageChange,
  offline = false,
}: {
  language: Language
  onLanguageChange: (language: Language) => void
  offline?: boolean
}) {
  return (
    <header className="brand-header">
      <strong>fresh&amp;co</strong>
      {offline ? (
        <div className="offline-status">
          <Icon src={assets.cloudOff} size={14} />
          <span>Offline · saved on device</span>
        </div>
      ) : (
        <LanguageSwitch language={language} onChange={onLanguageChange} />
      )}
    </header>
  )
}

function BottomActions({
  primary,
  secondary,
  onPrimary,
  onSecondary,
}: {
  primary: string
  secondary: string
  onPrimary: () => void
  onSecondary?: () => void
}) {
  return (
    <footer className="bottom-actions">
      <button className="primary-button" onClick={onPrimary} type="button">
        {primary}
      </button>
      {onSecondary ? (
        <button className="footer-link" onClick={onSecondary} type="button">
          {secondary}
        </button>
      ) : (
        <p>{secondary}</p>
      )}
    </footer>
  )
}

function SignIn({
  language,
  onLanguageChange,
  onComplete,
}: {
  language: Language
  onLanguageChange: (language: Language) => void
  onComplete: () => void
}) {
  const [mobile, setMobile] = useState("98765 43210")
  const [error, setError] = useState("")

  function submit(event: FormEvent) {
    event.preventDefault()
    if (mobile.replace(/\D/g, "").length !== 10) {
      setError("Enter a valid 10-digit mobile number.")
      return
    }
    setError("")
    onComplete()
  }

  return (
    <main className="screen">
      <div className="screen-content">
        <BrandHeader language={language} onLanguageChange={onLanguageChange} />
        <form className="sign-in-body" id="sign-in-form" onSubmit={submit}>
          <section className="intro-block">
            <div className="round-icon large">
              <Icon src={assets.phone} size={30} />
            </div>
            <div className="intro-copy">
              <p className="eyebrow">FRESH&amp;CO SALES</p>
              <h1>Sign in to your beat</h1>
              <p className="lead">
                Use the mobile number linked to your company-issued rep account.
              </p>
            </div>
          </section>

          <label className="phone-field">
            <span>Mobile number</span>
            <div className={`phone-input ${error ? "invalid" : ""}`}>
              <strong>+91</strong>
              <i />
              <input
                aria-describedby={error ? "phone-error" : "phone-help"}
                aria-invalid={Boolean(error)}
                inputMode="numeric"
                maxLength={12}
                onChange={(event) => setMobile(event.target.value)}
                value={mobile}
              />
            </div>
            <small
              className={error ? "error" : ""}
              id={error ? "phone-error" : "phone-help"}
            >
              {error || "We’ll send an OTP by SMS to verify it."}
            </small>
          </label>

          <aside className="notice">
            <Icon src={assets.wifi} size={20} />
            <div>
              <strong>Connect for your first sign-in</strong>
              <p>
                Use mobile data or Wi-Fi to verify your account and download
                your beat.
              </p>
            </div>
          </aside>

          <section className="support">
            <p>
              Access is set up by your distributor. New rep or number not
              registered?
            </p>
            <a href="mailto:supervisor@freshandco.example">
              <Icon src={assets.headset} size={18} />
              Contact your supervisor
            </a>
          </section>
        </form>
      </div>
      <footer className="bottom-actions">
        <button className="primary-button" form="sign-in-form" type="submit">
          Send OTP
        </button>
        <p>Company rep accounts only</p>
      </footer>
    </main>
  )
}

const benefits = [
  {
    icon: assets.reuse,
    title: "Reuse the last order",
    copy: (
      <>
        Start with what sold last time.
        <br />
        Adjust quantities in a few taps.
      </>
    ),
  },
  {
    icon: assets.scheme,
    title: "Schemes apply automatically",
    copy: (
      <>
        Eligible offers and free units are
        <br />
        added as you build the order.
      </>
    ),
  },
  {
    icon: assets.wallet,
    title: "Keep track of collections",
    copy: (
      <>
        Check outstanding balances and
        <br />
        record payments at each outlet.
      </>
    ),
  },
  {
    icon: assets.cloudCheck,
    title: "Save visits offline",
    copy: (
      <>
        Orders and collections stay on this
        <br />
        phone and sync when you’re online.
      </>
    ),
  },
]

function Welcome({
  language,
  onLanguageChange,
  onStart,
}: {
  language: Language
  onLanguageChange: (language: Language) => void
  onStart: () => void
}) {
  return (
    <main className="screen">
      <div className="screen-content">
        <BrandHeader language={language} onLanguageChange={onLanguageChange} />
        <div className="welcome-body">
          <section className="welcome-heading">
            <div className="welcome-title-row">
              <div className="round-icon">
                <Icon src={assets.store} size={30} />
              </div>
              <div>
                <p className="eyebrow">LET’S GET STARTED</p>
                <h1>Welcome, Neha</h1>
              </div>
            </div>
            <p className="lead">
              Your beat, orders and collections in one place. Make every outlet
              visit count.
            </p>
          </section>

          <section
            className="benefit-list"
            aria-label="Daily workflow benefits"
          >
            {benefits.map((benefit) => (
              <article className="benefit-card" key={benefit.title}>
                <div className="square-icon">
                  <Icon src={benefit.icon} size={22} />
                </div>
                <div>
                  <h2>{benefit.title}</h2>
                  <p>{benefit.copy}</p>
                </div>
              </article>
            ))}
          </section>

          <aside className="notice daily">
            <Icon src={assets.timer} size={20} />
            <div>
              <strong>Built for a 3-minute visit</strong>
              <p>Order. Collect. Save. On to the next outlet.</p>
            </div>
          </aside>
        </div>
      </div>
      <BottomActions
        onPrimary={onStart}
        primary="Start my day"
        secondary="View today’s beat and your first outlet"
      />
    </main>
  )
}

function Outlet({
  language,
  onLanguageChange,
  onBack,
  onStartOrder,
}: {
  language: Language
  onLanguageChange: (language: Language) => void
  onBack: () => void
  onStartOrder: () => void
}) {
  const [orderReused, setOrderReused] = useState(false)
  const [message, setMessage] = useState("")

  return (
    <main className="screen outlet-screen">
      <div className="screen-content">
        <BrandHeader
          language={language}
          onLanguageChange={onLanguageChange}
          offline
        />
        <section className="outlet-heading">
          <div>
            <button
              aria-label="Back to welcome"
              className="back-button"
              onClick={onBack}
              type="button"
            >
              <Icon src={assets.back} size={22} />
            </button>
            <p>STEP 1 OF 4 · OUTLET</p>
          </div>
          <h1>Sharma Kirana Store</h1>
        </section>

        <div className="outlet-body">
          <section className="card language-card">
            <div className="card-heading">
              <Icon src={assets.globe} size={22} />
              <h2>Language preference</h2>
            </div>
            <p>Applies to all visit screens</p>
            <div
              className="visit-language"
              aria-label="Visit language preference"
            >
              {(["English", "हिन्दी"] as const).map((option) => (
                <button
                  className={language === option ? "active" : ""}
                  key={option}
                  onClick={() => onLanguageChange(option)}
                  type="button"
                >
                  <span>{option}</span>
                  {language === option && <i />}
                </button>
              ))}
            </div>
          </section>

          <div className="location">
            <Icon src={assets.pin} size={18} />
            <p>Raja Park, Jaipur · Outlet JP-042</p>
          </div>

          <section className="card beat-card">
            <div className="beat-meta">
              <strong>TODAY’S BEAT</strong>
              <span>12 of 38 outlets</span>
            </div>
            <h2>Ready for a 3-minute visit?</h2>
            <p>
              Ramesh Sharma · Owner
              <br />
              Neha Singh · Visit started 10:42 am
            </p>
          </section>

          <section className="card payment-card">
            <div className="card-heading">
              <Icon src={assets.wallet} size={22} />
              <h2>Outstanding payment</h2>
            </div>
            <strong className="amount">₹1,240</strong>
            <p>From previous invoices · as of last sync</p>
            <span className="overdue">₹620 overdue by 5 days</span>
          </section>

          <section className="card order-card">
            <div className="order-meta">
              <span>LAST ORDER · 19 OCT</span>
              <strong>₹480</strong>
            </div>
            <h2>3 products · 20 paid + 1 free unit</h2>
            <p>Mango drink, masala crackers &amp; roasted peanuts.</p>
            <button
              onClick={() => setOrderReused((current) => !current)}
              type="button"
            >
              <Icon
                src={orderReused ? assets.circleCheck : assets.reuse}
                size={22}
              />
              {orderReused ? "Last order added" : "Reuse last order"}
            </button>
          </section>

          <aside className="notice offline-note">
            <Icon src={assets.circleCheck} size={20} />
            <div>
              <strong>No network? Keep going.</strong>
              <p>
                Orders and collections stay on this phone until they can sync.
              </p>
            </div>
          </aside>

          {message && (
            <p aria-live="polite" className="action-message">
              {message}
            </p>
          )}
        </div>
      </div>
      <BottomActions
        onPrimary={onStartOrder}
        onSecondary={() =>
          setMessage("Visit marked complete without an order.")
        }
        primary="Start order"
        secondary="Complete visit without an order"
      />
    </main>
  )
}

function VisitHeader({
  progress,
  title,
  onBack,
  complete = false,
}: {
  progress: string
  title: string
  onBack?: () => void
  complete?: boolean
}) {
  return (
    <>
      <BrandHeader
        language="English"
        onLanguageChange={() => undefined}
        offline
      />
      <section className="outlet-heading visit-heading">
        <div>
          <button
            aria-label={complete ? "Visit completed" : "Go back"}
            className="back-button"
            disabled={!onBack}
            onClick={onBack}
            type="button"
          >
            <Icon src={complete ? assets.done : assets.back} size={22} />
          </button>
          <p>{progress}</p>
        </div>
        <h1>{title}</h1>
      </section>
    </>
  )
}

function ProductPack({ product }: { product: Product }) {
  return (
    <div
      className="product-pack"
      style={{ backgroundColor: product.packColor }}
    >
      <span>fresh&amp;co</span>
      <Icon src={product.icon} size={22} />
    </div>
  )
}

function getOrderTotals(products: Product[]) {
  const activeProducts = products.filter((product) => product.quantity > 0)
  const total = activeProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  )
  const paidUnits = activeProducts.reduce(
    (sum, product) => sum + product.quantity,
    0,
  )
  const freeUnits = activeProducts.reduce(
    (sum, product) =>
      sum +
      (product.scheme
        ? Math.floor(product.quantity / product.scheme.threshold) *
          product.scheme.free
        : 0),
    0,
  )
  return { activeProducts, total, paidUnits, freeUnits }
}

function OrderScreen({
  products,
  setProducts,
  onBack,
  onReview,
}: {
  products: Product[]
  setProducts: (update: (products: Product[]) => Product[]) => void
  onBack: () => void
  onReview: () => void
}) {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"order" | "all">("order")
  const { total, paidUnits, freeUnits } = getOrderTotals(products)
  const visibleProducts = products.filter((product) =>
    `${product.name} ${product.size}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )

  function updateQuantity(id: string, change: number) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + change) }
          : product,
      ),
    )
  }

  return (
    <main className="screen visit-screen">
      <div className="screen-content">
        <VisitHeader onBack={onBack} progress="ORDER · 2 OF 4" title="Order" />
        <div className="visit-body">
          <div className="outlet-identity">
            <strong>Sharma Kirana Store</strong>
            <span>Last order ₹480 · 19 Oct</span>
          </div>

          <label className="search-field">
            <Icon src={assets.search} size={22} />
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or product code"
              value={query}
            />
          </label>

          <div className="browse-tabs">
            <button
              className={activeTab === "order" ? "active" : ""}
              onClick={() => setActiveTab("order")}
              type="button"
            >
              In order (
              {products.filter((product) => product.quantity > 0).length})
            </button>
            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
              type="button"
            >
              All products
            </button>
          </div>
          <p className="reuse-status">
            {activeTab === "order"
              ? "Last order reused · 1 new product added"
              : "All available products"}
          </p>

          <section className="product-list" aria-label="Products">
            {visibleProducts.map((product) => {
              const free = product.scheme
                ? Math.floor(product.quantity / product.scheme.threshold) *
                  product.scheme.free
                : 0
              const remaining = product.scheme
                ? product.scheme.threshold -
                  (product.quantity % product.scheme.threshold)
                : 0
              return (
                <article className="product-card" key={product.id}>
                  <div className="product-identity">
                    <ProductPack product={product} />
                    <div>
                      <h2>{product.name}</h2>
                      <p>
                        {product.size} · ₹{product.price} / unit
                      </p>
                    </div>
                  </div>
                  <div className="quantity-row">
                    <div className="quantity-control">
                      <button
                        aria-label={`Decrease ${product.name} quantity`}
                        onClick={() => updateQuantity(product.id, -1)}
                        type="button"
                      >
                        <Icon src={assets.minus} size={18} />
                      </button>
                      <strong>{product.quantity}</strong>
                      <button
                        aria-label={`Increase ${product.name} quantity`}
                        onClick={() => updateQuantity(product.id, 1)}
                        type="button"
                      >
                        <Icon src={assets.plus} size={18} />
                      </button>
                    </div>
                    <div className="line-total">
                      <strong>₹{product.price * product.quantity}</strong>
                      <span>paid units only</span>
                    </div>
                  </div>
                  {product.scheme &&
                    (free > 0 ? (
                      <div className="scheme-box eligible">
                        <strong>
                          Buy {product.scheme.threshold}, get{" "}
                          {product.scheme.free} free · same product
                        </strong>
                        <span>
                          {product.quantity} paid → {free} free{" "}
                          {free === 1 ? "unit" : "units"} added
                        </span>
                      </div>
                    ) : (
                      <div className="scheme-box prompt">
                        <strong>Add {remaining} more to get 1 free</strong>
                        <span>
                          Current {product.quantity} · next free at{" "}
                          {product.quantity + remaining} units
                        </span>
                      </div>
                    ))}
                </article>
              )
            })}
            {visibleProducts.length === 0 && (
              <div className="empty-state">No matching products</div>
            )}
          </section>
        </div>
      </div>
      <footer className="bottom-actions order-actions">
        <strong>
          {products.filter((product) => product.quantity > 0).length} products ·{" "}
          {paidUnits} paid + {freeUnits} free units
        </strong>
        <button className="primary-button" onClick={onReview} type="button">
          Review &amp; submit · ₹{total}
        </button>
      </footer>
    </main>
  )
}

function SummaryRow({
  label,
  value,
  emphasized = false,
  green = false,
}: {
  label: string
  value: string
  emphasized?: boolean
  green?: boolean
}) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <strong
        className={`${emphasized ? "emphasized" : ""} ${green ? "green" : ""}`}
      >
        {value}
      </strong>
    </div>
  )
}

function ReviewScreen({
  products,
  onBack,
  onSubmit,
}: {
  products: Product[]
  onBack: () => void
  onSubmit: (method: PaymentMethod, collected: number) => void
}) {
  const [method, setMethod] = useState<PaymentMethod>("Cash")
  const [amount, setAmount] = useState("300")
  const { activeProducts, total, paidUnits, freeUnits } =
    getOrderTotals(products)
  const collected = method === "Skip" ? 0 : Number(amount) || 0

  return (
    <main className="screen visit-screen">
      <div className="screen-content">
        <VisitHeader
          onBack={onBack}
          progress="STEP 3 OF 4 · REVIEW & SUBMIT"
          title="Review & submit"
        />
        <div className="visit-body review-body">
          <p className="muted-copy">Sharma Kirana Store · JP-042</p>
          <article className="card review-order">
            <div className="review-card-head">
              <span>{activeProducts.length} PRODUCTS</span>
              <button onClick={onBack} type="button">
                Edit quantities
              </button>
            </div>
            {activeProducts.map((product) => {
              const free = product.scheme
                ? Math.floor(product.quantity / product.scheme.threshold) *
                  product.scheme.free
                : 0
              return (
                <div className="review-line" key={product.id}>
                  <SummaryRow
                    emphasized
                    label={`${product.name} · ${product.size}`}
                    value={`₹${product.price * product.quantity}`}
                  />
                  <p>
                    {product.quantity} paid units × ₹{product.price}
                  </p>
                  {free > 0 && (
                    <div className="free-line">
                      <strong>
                        + {free} free {product.name.toLowerCase()}
                      </strong>
                      <span>₹0</span>
                    </div>
                  )}
                </div>
              )
            })}
          </article>

          <aside className="notice scheme-notice">
            <Icon src={assets.circleCheck} size={20} />
            <div>
              <strong>
                Scheme applied: {paidUnits} paid → {freeUnits} free
              </strong>
              <p>
                Free units are added automatically. You receive{" "}
                {paidUnits + freeUnits} units and pay for {paidUnits}.
              </p>
            </div>
          </aside>

          <article className="card collection-card">
            <SummaryRow label="Previous outstanding" value="₹1,240" />
            <SummaryRow label="Overdue" value="₹620" />
            <div className="collection-method">
              <strong>Record collection · optional</strong>
              <div>
                {(["Cash", "UPI", "Skip"] as PaymentMethod[]).map((option) => (
                  <button
                    className={method === option ? "active" : ""}
                    key={option}
                    onClick={() => setMethod(option)}
                    type="button"
                  >
                    {method === option && (
                      <Icon src={assets.selected} size={16} />
                    )}
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {method !== "Skip" && (
              <label className="collection-amount">
                <span>Amount collected</span>
                <div>
                  <strong>₹</strong>
                  <input
                    aria-label="Amount collected"
                    inputMode="numeric"
                    onChange={(event) =>
                      setAmount(event.target.value.replace(/\D/g, ""))
                    }
                    value={amount}
                  />
                  <small>{method}</small>
                </div>
              </label>
            )}
            <SummaryRow
              label="Remaining prior balance"
              value={`₹${Math.max(0, 1240 - collected)}`}
            />
            <p>
              Prior balance excludes this new ₹{total} order until it is
              invoiced.
            </p>
          </article>

          <aside className="notice warning-note">
            <Icon src={assets.alert} size={18} />
            <div>
              <strong>Offline UPI is not verified</strong>
              <p>
                If you choose UPI, the receipt must be independently checked
                before final settlement.
              </p>
            </div>
          </aside>

          <article className="card totals-card">
            <SummaryRow label="Paid units" value={`${paidUnits}`} />
            <SummaryRow
              green
              label="Free units · added automatically"
              value={`${freeUnits}`}
            />
            <SummaryRow label="Products subtotal" value={`₹${total}`} />
            <SummaryRow label="Free items" value="₹0" />
            <SummaryRow
              label={
                method === "Skip"
                  ? "Collection skipped"
                  : `${method} collected · prior invoices`
              }
              value={`₹${collected}`}
            />
            <div className="total-divider">
              <SummaryRow emphasized label="Order total" value={`₹${total}`} />
            </div>
          </article>
        </div>
      </div>
      <footer className="bottom-actions order-actions review-actions">
        <strong>
          ₹{total} order · {paidUnits} paid + {freeUnits} free · ₹{collected}{" "}
          {method === "Skip"
            ? "not collected"
            : `${method.toLowerCase()} collected`}
        </strong>
        <button
          className="primary-button"
          onClick={() => onSubmit(method, collected)}
          type="button"
        >
          Save order &amp; submit
        </button>
        <div className="offline-footer">
          <Icon src={assets.cloudOff} size={14} />
          <span>
            Offline · saves order and collection on device, queued for sync.
          </span>
        </div>
      </footer>
    </main>
  )
}

function DoneScreen({
  products,
  method,
  collected,
  onNext,
  onCancel,
}: {
  products: Product[]
  method: PaymentMethod
  collected: number
  onNext: () => void
  onCancel: () => void
}) {
  const [showSaved, setShowSaved] = useState(false)
  const { activeProducts, total, paidUnits, freeUnits } =
    getOrderTotals(products)

  return (
    <main className="screen visit-screen">
      <div className="screen-content">
        <VisitHeader
          complete
          progress="STEP 4 OF 4 · DONE"
          title="Visit complete"
        />
        <div className="visit-body done-body">
          <section className="completion-message">
            <div className="success-mark">
              <Icon src={assets.doneDouble} size={32} />
            </div>
            <div>
              <strong>Saved on this phone.</strong>
              <p>Sharma Kirana Store · 10:44 am</p>
            </div>
          </section>
          <div className="status-badges">
            <span>2 min 18 sec</span>
            <span>12 of 38 outlets visited</span>
          </div>
          <aside className="notice saved-note">
            <Icon src={assets.savedOffline} size={20} />
            <div>
              <strong>Saved · not sent</strong>
              <p>
                Queued until you’re online. You can cancel this unsent order;
                the ₹{collected} {method.toLowerCase()} collection stays
                recorded.
              </p>
            </div>
          </aside>
          <article className="card saved-card">
            <div className="saved-heading">
              <Icon src={assets.packageCheck} size={22} />
              <strong>Order saved on device</strong>
            </div>
            <SummaryRow
              emphasized
              label="Local order FC-221042"
              value={`₹${total}`}
            />
            <p>
              {activeProducts.length} products · {paidUnits} paid + {freeUnits}{" "}
              free units
            </p>
            <span className="saved-badge">Saved · not sent</span>
            <div className="saved-payment">
              <div className="saved-heading">
                <Icon src={assets.banknote} size={22} />
                <strong>Payment record saved</strong>
              </div>
              <SummaryRow
                emphasized
                label={`${
                  method === "Skip"
                    ? "Collection skipped"
                    : `${method} collected`
                }`}
                value={`₹${collected}`}
              />
              <p>Collection recorded locally · not yet synced</p>
              <SummaryRow
                label="Previous balance remaining"
                value={`₹${Math.max(0, 1240 - collected)}`}
              />
              <p>Excludes today’s order until it is invoiced.</p>
            </div>
          </article>
          <button
            className="saved-visit-button"
            onClick={() => setShowSaved((current) => !current)}
            type="button"
          >
            <Icon src={assets.file} size={22} />
            {showSaved ? "Hide saved visit" : "View saved visit"}
          </button>
          {showSaved && (
            <div className="saved-detail">
              Saved locally at 10:44 am. Sync will start automatically when the
              device is online.
            </div>
          )}
          <article className="next-outlet">
            <strong>UP NEXT · RAJA PARK BEAT</strong>
            <h2>Gupta General Store</h2>
            <p>Lane 4, Raja Park · 300 m away</p>
          </article>
        </div>
      </div>
      <footer className="bottom-actions done-actions">
        <button className="primary-button" onClick={onNext} type="button">
          Next outlet
        </button>
        <button className="secondary-button" onClick={onCancel} type="button">
          Cancel unsent order
        </button>
      </footer>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("sign-in")
  const [language, setLanguage] = useState<Language>("English")
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [payment, setPayment] = useState<{
    method: PaymentMethod
    collected: number
  }>({ method: "Cash", collected: 300 })

  if (screen === "welcome") {
    return (
      <Welcome
        language={language}
        onLanguageChange={setLanguage}
        onStart={() => setScreen("outlet")}
      />
    )
  }

  if (screen === "outlet") {
    return (
      <Outlet
        language={language}
        onBack={() => setScreen("welcome")}
        onLanguageChange={setLanguage}
        onStartOrder={() => {
          setScreen("order")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />
    )
  }

  if (screen === "order") {
    return (
      <OrderScreen
        onBack={() => setScreen("outlet")}
        onReview={() => {
          setScreen("review")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        products={products}
        setProducts={setProducts}
      />
    )
  }

  if (screen === "review") {
    return (
      <ReviewScreen
        onBack={() => setScreen("order")}
        onSubmit={(method, collected) => {
          setPayment({ method, collected })
          setScreen("done")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        products={products}
      />
    )
  }

  if (screen === "done") {
    return (
      <DoneScreen
        collected={payment.collected}
        method={payment.method}
        onCancel={() => {
          setProducts(initialProducts)
          setScreen("order")
        }}
        onNext={() => {
          setProducts(initialProducts)
          setScreen("outlet")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        products={products}
      />
    )
  }

  return (
    <SignIn
      language={language}
      onComplete={() => setScreen("welcome")}
      onLanguageChange={setLanguage}
    />
  )
}
