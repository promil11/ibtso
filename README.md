# IBTSO Retail Intelligence SaaS — MVP Demo

> **Physical Retail Execution & Market Share Intelligence Platform for Electronics & Appliances in the Sultanate of Oman**

IBTSO Retail Intelligence is an enterprise B2B SaaS platform designed for global Electronics & Home Appliance manufacturers (e.g., **LG, Samsung, Midea, Toshiba, Philips, Haier, Hitachi, Gree, Panasonic**) to measure, benchmark, and optimize their **Brand Visibility Share** across Independent Retailers (IR) in Oman.

---

## 🚀 Business Opportunity & Market Context

In the Sultanate of Oman, consumer sales (*sell-out*) of home appliances are distributed across two distinct retail channels:

- **Organised Retailers (OR)** (~30% Sell-Out): Large hypermarket chains such as *Lulu, Carrefour, Nesto*.
- **Independent Retailers (IR)** (~70% Sell-Out): A network of **~230 local independent electronics dealers** across Oman.

While Organised Retail is digitally tracked, the **70% IR market** was historically unstructured and unmonitored. IBTSO bridges this gap by carrying out monthly physical floor audits across all **230 IR Dealers**, transforming physical shelf presence into real-time market intelligence.

---

## ✨ Key Features & Demo Screens

### 1. 🔑 Corporate Brand Executive Authentication
- Multi-brand enterprise authentication system allowing brand directors to view their specific market share data.
- Saved session state with persistent login and sign-out controls.

### 2. 📊 Executive Brand Intelligence Dashboard
- High-level KPIs: **National Visibility Share %**, **Monitored Floor Displays**, **IR Store Penetration %**, and **Prime Shelf Ratio % (Eye-level/Feature stands)**.
- Oman Market 70/30 IR vs OR context banner.
- Top competitor visibility share bar charts and market share distribution pie charts.

### 3. 🏪 230 Independent Retailer (IR) Directory
- Interactive directory covering all 230 IR dealers across Oman.
- Filterable by **Governorate (Region)**, **City/Wilayat**, **Store Tier (A, B, C)**, and **Product Category**.
- Instant search by store name or dealer code (`OM-IR-042`).

### 4. 🔍 Granular Dealer Detail Inspection
- Store-level physical audit log detailing individual SKU models, placement quality (*Prime Eye-level*, *Endcap*, *Standard Floor*), branded POS signage presence, and active promotional tags.

### 5. ❄️ 6 Core Focus Product Categories
Deep-dive visibility breakdown across the 6 MVP categories:
1. **Air Conditioners**
2. **Refrigerators**
3. **Washing Machines**
4. **Cooking Ranges**
5. **Dishwashers**
6. **TV / Built-ins**

### 6. ⚔️ Brand vs. Competitor Head-to-Head Comparison
- Comparative matrix ranking client brand against top competitors.
- Rank shifts, display volume gap, and prime shelving quality comparisons.

### 7. 🌐 Multi-Level Hierarchical Benchmarking
Drill-down pipeline through the 4 required benchmark levels:
$$\text{Dealer Level} \longrightarrow \text{City / Wilayat} \longrightarrow \text{Regional Governorate} \longrightarrow \text{National Oman Benchmark}$$

### 8. 📈 Monthly MoM Visibility Trends
- Month-on-month visibility share tracking across consecutive audit cycles (`2026-08`, `2026-09`, `2026-10`).

### 9. 📄 Reports & Commercial Export
- One-click commercial PDF / CSV report generator for executive client presentations.

### 10. 🔮 Phase 3 Strategic Expansion Roadmap
- Interactive vision drawer detailing IBTSO's Phase 3 evolution: direct dealer ERP integration for **Sell-Out Volumes, Dealer Inventory Levels, Street Pricing, and Promotions**.

---

## 📐 Brand Visibility Share Formula

$$\text{Brand Visibility Share \%} = \left( \frac{\text{Brand Models Displayed in Category}}{\text{Total Models Displayed in Category}} \right) \times 100$$

*Example:* If a store displays 10 AC models (4 LG, 2 Midea, 2 Gree, 1 Samsung, 1 Panasonic), **LG's Visibility Share is 40%**.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 + Vanilla CSS
- **Icons**: Lucide React
- **Data Visualization**: Recharts

---

## 💻 Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone <your-github-repo-url>
cd ibtso
yarn install   # or npm install
```

### 2. Start Development Server
```bash
yarn dev       # or npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) (or the port indicated in terminal) in your browser.

### 3. Verify Production Build
```bash
yarn build     # or npm run build
```

---

## 🔑 Demo Corporate Brand Executive Credentials

You can sign in with any of the following corporate demo accounts:

| Brand Account | Corporate Email | Password | Role / Title |
| :--- | :--- | :--- | :--- |
| **LG Electronics** | `lg@ibtso.com` | `lg2026` | LG Commercial Retail Director |
| **Samsung Gulf** | `samsung@ibtso.com` | `samsung2026` | Samsung Retail Intelligence Lead |
| **Midea Middle East** | `midea@ibtso.com` | `midea2026` | Midea Appliance Category Head |
| **Gree Air Conditioning** | `gree@ibtso.com` | `gree2026` | Gree Regional Sales Director |
| **Toshiba Appliances** | `toshiba@ibtso.com` | `toshiba2026` | Toshiba Regional Retail Lead |
| **IBTSO Super Admin** | `admin@ibtso.com` | `ibtso2026` | IBTSO Master Administrator |

---

## 📤 Pushing to GitHub

To push this repository to your GitHub account:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "feat: IBTSO Retail Intelligence SaaS MVP initial release"

# 4. Rename branch to main
git branch -M main

# 5. Link to your GitHub repository
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push to GitHub
git push -u origin main
```

---

## 🏢 About IBTSO

**IBTSO** is a leading Retail Execution & Intelligence company operating in the Sultanate of Oman.
- Website: [https://ibtso.com/](https://ibtso.com/)
- Core Sector: Electronics & Home Appliances
