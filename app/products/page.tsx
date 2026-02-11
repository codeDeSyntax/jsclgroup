// "use client";

// import Header from '@/components/header'
// import Footer from '@/components/footer'
// import Image from 'next/image'
// import { Star, ShoppingCart, Zap, ArrowRight, Filter, Search, Users, Shield, Sparkles, Package, Smartphone, Monitor, Headphones, Camera, Coffee, Heart, CheckCircle } from 'lucide-react'
// import Link from 'next/link'
// import { gadgetsImages } from '@/lib/images'

// // Hero Statistics Component - Following sample's structure for products division
// const HeroStats = () => (
//   <div className="space-y-4">
//     <div className="bg-gradient-to-r from-brand-orange/20 to-brand-navy/20 rounded-2xl p-6 backdrop-blur-sm animate-fadeInUp">
//       <p className="text-xs text-white/80 mb-2">Products Sold This Year</p>
//       <div className="text-3xl font-bold text-white">25K+</div>
//     </div>
//     <div className="bg-gradient-to-r from-brand-navy/20 to-brand-orange/20 rounded-2xl p-6 backdrop-blur-sm animate-fadeInUp" style={{animationDelay: '0.2s'}}>
//       <p className="text-xs text-white/80 mb-2">Satisfied Customers</p>
//       <div className="text-3xl font-bold text-white">5K+</div>
//     </div>
//   </div>
// );

// // Client Satisfaction Component - Following sample's circular images pattern
// const ClientSatisfaction = () => (
//   <div className="relative animate-fadeInLeft">
//     <div className="grid grid-cols-2 gap-4 mb-4">
//       <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl border-4 border-white/20">
//         <Image
//           src={gadgetsImages.products[0]?.secure_url || ''}
//           alt="Happy Customer 1"
//           width={96}
//           height={96}
//           className="object-cover w-full h-full"
//         />
//       </div>
//       <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl border-4 border-white/20">
//         <Image
//           src={gadgetsImages.products[1]?.secure_url || ''}
//           alt="Happy Customer 2"
//           width={96}
//           height={96}
//           className="object-cover w-full h-full"
//         />
//       </div>
//     </div>
//     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-xl">
//       <p className="text-sm font-semibold text-white">
//         <Link href="#" className="hover:text-brand-orange transition-colors">99%</Link> Customer Satisfaction
//       </p>
//     </div>
//   </div>
// );

// // Product Features Icons Component - Following sample's icon grid pattern
// const ProductFeatures = () => (
//   <div className="grid grid-cols-3 gap-8 animate-fadeInRight">
//     <div className="text-center">
//       <div className="w-20 h-20 bg-brand-orange/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
//         <Shield className="w-10 h-10 text-brand-orange" />
//       </div>
//       <h6 className="text-sm font-semibold text-white">Warranty</h6>
//     </div>
//     <div className="text-center" style={{animationDelay: '0.2s'}}>
//       <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
//         <Zap className="w-10 h-10 text-white" />
//       </div>
//       <h6 className="text-sm font-semibold text-white">Fast Delivery</h6>
//     </div>
//     <div className="text-center" style={{animationDelay: '0.4s'}}>
//       <div className="w-20 h-20 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
//         <CheckCircle className="w-10 h-10 text-green-400" />
//       </div>
//       <h6 className="text-sm font-semibold text-white">Quality</h6>
//     </div>
//   </div>
// );

// // Search Filters Component - Modular search section for products
// const SearchFilters = () => (
//   <section className="py-16 relative -mt-20 z-10">
//     <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
//       <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-gray-100">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search Products"
//               className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm font-medium"
//             />
//           </div>
//           <div className="relative">
//             <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <select className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm font-medium appearance-none bg-white">
//               <option>All Categories</option>
//               <option>Electronics</option>
//               <option>Smart Home</option>
//               <option>Audio</option>
//               <option>Security</option>
//             </select>
//           </div>
//           <div className="relative">
//             <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 font-medium">$</span>
//             <input
//               type="number"
//               placeholder="Max Price"
//               className="w-full pl-8 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm font-medium"
//             />
//           </div>
//           <button className="flex items-center justify-center gap-3 px-8 py-4 bg-brand-navy text-white rounded-xl hover:opacity-90 transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
//             <Filter className="w-5 h-5" />
//             Find Products
//           </button>
//         </div>
//       </div>
//     </div>
//   </section>
// );
// // Product Card Component - Following sample's card structure
// const ProductCard = ({ product, index }: { product: any; index: number }) => (
//   <div 
//     className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group animate-fadeInUp"
//     style={{animationDelay: `${index * 0.1}s`}}
//   >
//     <div className="relative h-64 bg-gray-50 overflow-hidden">
//       <Image
//         src={gadgetsImages.products[product.id % gadgetsImages.products.length]?.secure_url || ''}
//         alt={product.name}
//         fill
//         className="object-cover group-hover:scale-110 transition-transform duration-700 p-4"
//         sizes="400px"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//       <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
//         <Heart size={20} className="text-red-500" />
//       </button>
//       <div className="absolute top-6 left-6 bg-brand-orange text-white px-4 py-2 rounded-full text-xs font-semibold">
//         {product.category}
//       </div>
//       {product.isNew && (
//         <div className="absolute top-16 left-6 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-semibold">
//           New
//         </div>
//       )}
//     </div>

//     <div className="p-8">
//       <div className="mb-4">
//         <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors mb-3 leading-tight">
//           {product.name}
//         </h3>
//         <div className="flex items-center gap-2 mb-2">
//           <div className="flex items-center gap-1">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} size={14} className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} />
//             ))}
//           </div>
//           <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
//         </div>
//         <p className="text-sm text-gray-600 leading-relaxed">
//           {product.description}
//         </p>
//       </div>

//       <div className="space-y-3 mb-6">
//         {product.features.slice(0, 3).map((feature: string, idx: number) => (
//           <div key={idx} className="flex items-center gap-3 text-sm text-gray-600">
//             <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
//             {feature}
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center justify-between pt-6 border-t border-gray-100">
//         <div className="text-2xl font-bold text-brand-navy">{product.price}</div>
//         <button className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl hover:opacity-90 transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
//           <ShoppingCart size={16} />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // Products Grid Component - Following sample's grid structure
// const ProductsGrid = ({ products }: { products: any[] }) => (
//   <section className="py-24 relative" id="products">
//     <div className="absolute top-20 left-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
//     <div className="absolute bottom-20 right-20 w-80 h-80 bg-brand-navy/5 rounded-full blur-3xl"></div>
    
//     <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
//       <div className="text-center mb-16">
//         <div className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4 animate-fadeInDown">
//           Featured Products
//         </div>
//         <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 animate-fadeInUp">
//           Explore Our Products
//         </h2>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp" style={{animationDelay: '0.2s'}}>
//           Discover cutting-edge electronics and gadgets with premium quality and innovative features
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {products.map((product, index) => (
//           <ProductCard key={product.id} product={product} index={index} />
//         ))}
//       </div>
//     </div>
//   </section>
// );
// // About Section Component - Following sample's two-column structure for products division
// const AboutSection = () => (
//   <section className="py-24 relative bg-gray-50">
//     <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//         {/* Left Content */}
//         <div className="animate-fadeInLeft">
//           <div className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-6">
//             Our Products Division
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
//             Innovation Through Technology
//           </h2>
//           <p className="text-lg text-gray-600 leading-relaxed mb-8">
//             JCL Group's Products & Sales Division bridges the gap between cutting-edge technology and everyday needs, offering premium electronics, gadgets, and innovative solutions that enhance modern living.
//           </p>
//           <p className="text-base text-gray-600 leading-relaxed mb-8">
//             From smart home automation to the latest consumer electronics, we curate products that combine quality, functionality, and style. Our commitment extends beyond sales to comprehensive support and customer satisfaction.
//           </p>
          
//           {/* Vision and Mission Cards */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp">
//               <h6 className="text-lg font-bold text-brand-navy mb-3">Our Vision</h6>
//               <p className="text-sm text-gray-600">
//                 To become Ghana's leading technology retail destination, making innovative products accessible to everyone while maintaining the highest standards of quality and customer service.
//               </p>
//             </div>
//             <div className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp" style={{animationDelay: '0.2s'}}>
//               <h6 className="text-lg font-bold text-brand-navy mb-3">Our Mission</h6>
//               <div className="space-y-2">
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-brand-orange rounded-full flex-shrink-0 mt-2"></div>
//                   <span className="text-sm text-gray-600">Source and distribute quality electronics and technology products.</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-brand-orange rounded-full flex-shrink-0 mt-2"></div>
//                   <span className="text-sm text-gray-600">Provide exceptional customer service and technical support.</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <div className="w-2 h-2 bg-brand-orange rounded-full flex-shrink-0 mt-2"></div>
//                   <span className="text-sm text-gray-600">Bridge technology gaps through accessible and affordable solutions.</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Content - Product showcase image */}
//         <div className="animate-fadeInRight">
//           <div className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
//             <Image
//               src={gadgetsImages.featured[2]?.secure_url || ''}
//               alt="Our Product Range"
//               fill
//               className="object-cover"
//               sizes="600px"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // Why Choose Us Component - Following sample's services structure for products
// const WhyChooseUs = () => (
//   <section className="py-24 relative">
//     <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
//       <div className="text-center mb-16">
//         <div className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4 animate-fadeInDown">
//           Why Shop With Us
//         </div>
//         <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 animate-fadeInUp">
//           Why Choose Our Products Division?
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all text-center group animate-fadeInUp">
//           <div className="w-20 h-20 bg-brand-navy/10 group-hover:bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
//             <Shield className="w-10 h-10 text-brand-navy group-hover:text-brand-orange transition-colors" />
//           </div>
//           <h3 className="text-xl font-bold text-brand-navy mb-4">Quality Guarantee</h3>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             All products come with comprehensive warranties and our commitment to quality, ensuring your investment is protected.
//           </p>
//         </div>
//         <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all text-center group animate-fadeInUp" style={{animationDelay: '0.1s'}}>
//           <div className="w-20 h-20 bg-brand-navy/10 group-hover:bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
//             <Zap className="w-10 h-10 text-brand-navy group-hover:text-brand-orange transition-colors" />
//           </div>
//           <h3 className="text-xl font-bold text-brand-navy mb-4">Fast Delivery</h3>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             Quick and reliable delivery service across Ghana with real-time tracking and secure packaging for all orders.
//           </p>
//         </div>
//         <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all text-center group animate-fadeInUp" style={{animationDelay: '0.2s'}}>
//           <div className="w-20 h-20 bg-brand-navy/10 group-hover:bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
//             <Users className="w-10 h-10 text-brand-navy group-hover:text-brand-orange transition-colors" />
//           </div>
//           <h3 className="text-xl font-bold text-brand-navy mb-4">Expert Support</h3>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             Our technical support team provides guidance on product selection, installation, and troubleshooting whenever needed.
//           </p>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // CTA Section Component for products
// const CTASection = () => (
//   <section className="py-24 relative">
//     <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
//       <div className="bg-brand-navy rounded-[2rem] p-16 text-center relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl"></div>
//         <div className="relative">
//           <ShoppingCart className="w-12 h-12 text-brand-orange mx-auto mb-6" />
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Ready to Shop Premium Products?
//           </h2>
//           <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
//             Browse our extensive catalog of premium electronics and gadgets. Contact our sales team for bulk orders and special pricing.
//           </p>
//           <Link
//             href="/contact"
//             className="inline-flex items-center gap-3 px-10 py-4 bg-brand-orange text-white rounded-full font-semibold hover:bg-white hover:text-brand-navy transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//           >
//             Shop Now
//             <ArrowRight className="w-5 h-5" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   </section>
// );
//     },
//     {
//       id: 5,
//       name: 'Portable Projector X1',
//       category: 'Display',
//       price: '$449.99',
//       rating: 4.8,
//       reviews: 127,
//       description: 'Compact 4K portable projection system',
//       features: ['4K Support', 'Portable', 'Built-in Speaker'],
//     },
//     {
//       id: 6,
//       name: 'Smart Lighting Kit',
//       category: 'Lighting',
//       price: '$129.99',
//       rating: 4.5,
//       reviews: 405,
//       description: 'RGB programmable smart lighting system',
//       features: ['16M Colors', 'Schedule Control', 'Voice Control'],
//     },
//     {
//       id: 7,
//       name: 'Robotic Vacuum Pro',
//       category: 'Home Cleaning',
//       price: '$599.99',
//       rating: 4.7,
//       reviews: 198,
//       description: 'AI-powered intelligent cleaning robot',
//       features: ['Obstacle Detection', 'Smart Mapping', 'Auto Charging'],
//     },
//     {
//       id: 8,
//       name: 'Air Purifier Smart',
//       category: 'Air Quality',
//       price: '$249.99',
//       rating: 4.6,
//       reviews: 267,
//       description: 'HEPA filter smart air purification system',
//       features: ['HEPA Filter', 'Air Quality Monitor', 'Auto Mode'],
//     },
//     {
//       id: 9,
//       name: '5G Mobile Router',
//       category: 'Connectivity',
//       price: '$189.99',
//       rating: 4.8,
//       reviews: 156,
//       description: 'Ultra-fast 5G portable connectivity solution',
//       features: ['5G Speed', 'Long Battery', 'Multiple Devices'],
//     },
//   ]

//   const categories = ['All Products', 'Smart Home', 'Audio', 'Security', 'Display', 'Climate Control', 'Lighting']

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="py-16 relative min-h-[60vh] flex items-center">
//           <div className=\"absolute inset-0 bg-gray-50\"></div>
//           <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               {/* Content */}
//               <div>
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center">
//                     <Zap className="w-6 h-6 text-brand-orange" />
//                   </div>
//                   <span className="text-sm font-semibold text-brand-orange">Premium Electronics</span>
//                 </div>
//                 <h1 className="text-4xl md:text-5xl font-bold text-brand-navy leading-tight mb-6">
//                   Latest Tech &<br />
//                   <span className="text-brand-orange">Smart Gadgets</span>
//                 </h1>
//                 <p className="text-lg text-gray-600 mb-8 leading-relaxed">
//                   Discover our carefully curated collection of cutting-edge technology products and smart home solutions.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <button className="inline-flex items-center gap-2 px-8 py-3 bg-brand-navy text-white rounded-full font-semibold hover:opacity-90 transition-all">
//                     Browse Products
//                     <ArrowRight size={18} />
//                   </button>
//                   <button className="inline-flex items-center gap-2 px-8 py-3 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all">
//                     <Filter size={18} />
//                     Filter by Category
//                   </button>
//                 </div>
//               </div>
              
//               {/* Images Bento */}
//               <div className="grid grid-cols-2 gap-4 h-[400px]">
//                 <div className="bg-white rounded-2xl p-6 flex items-center justify-center shadow-lg border border-gray-100">
//                   <Image
//                     src={gadgetsImages.featured[0]?.secure_url || ''}
//                     alt="Featured Product"
//                     width={180}
//                     height={120}
//                     className="object-contain"
//                   />
//                 </div>
//                 <div className="space-y-4">
//                   <div className="bg-white rounded-2xl p-4 flex items-center justify-center shadow-lg border border-gray-100 flex-1">
//                     <Image
//                       src={gadgetsImages.featured[1]?.secure_url || ''}
//                       alt="Product 2"
//                       width={120}
//                       height={80}
//                       className="object-contain"
//                     />
//                   </div>
//                   <div className="bg-white rounded-2xl p-4 flex items-center justify-center shadow-lg border border-gray-100 flex-1">
//                     <Image
//                       src={gadgetsImages.featured[2]?.secure_url || ''}
//                       alt="Product 3"
//                       width={120}
//                       height={80}
//                       className="object-contain"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Category Filter */}
//         <section className="py-8 bg-white border-b border-border">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="flex overflow-x-auto gap-2 pb-2">
//               {categories.map((category, index) => (
//                 <button
//                   key={index}
//                   className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
//                     index === 0
//                       ? 'bg-primary text-white'
//                       : 'bg-background text-foreground hover:bg-secondary'
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Products Grid */}
//         <section className="py-16 md:py-24 bg-background">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {products.map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
//                 >
//                   {/* Product Image */}
//                   <div className="h-56 bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
//                     <div className="text-6xl">📱</div>
//                   </div>

//                   {/* Product Info */}
//                   <div className="p-6">
//                     <div className="flex items-start justify-between mb-2">
//                       <div>
//                         <p className="text-sm text-primary font-semibold mb-1">{product.category}</p>
//                         <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
//                       </div>
//                     </div>

//                     <p className="text-foreground/60 text-sm mb-4">{product.description}</p>

//                     {/* Rating */}
//                     <div className="flex items-center gap-2 mb-4">
//                       <div className="flex gap-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <Star
//                             key={i}
//                             size={16}
//                             className={i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-border'}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-sm text-foreground/60">
//                         {product.rating} ({product.reviews} reviews)
//                       </span>
//                     </div>

//                     {/* Features */}
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {product.features.map((feature, index) => (
//                         <span
//                           key={index}
//                           className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>

//                     {/* Price and Button */}
//                     <div className="flex items-center justify-between">
//                       <span className="text-2xl font-bold text-primary">{product.price}</span>
//                       <button className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
//                         <ShoppingCart size={20} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Why Choose Us */}
//         <section className="py-16 md:py-24 bg-white">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Shop With Us?</h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="text-center">
//                 <div className="text-4xl mb-4">✓</div>
//                 <h3 className="text-lg font-semibold text-foreground mb-2">Authentic Products</h3>
//                 <p className="text-foreground/60">
//                   All items are genuine with full manufacturer warranties.
//                 </p>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl mb-4">🚚</div>
//                 <h3 className="text-lg font-semibold text-foreground mb-2">Fast Delivery</h3>
//                 <p className="text-foreground/60">
//                   Quick shipping with tracking and insurance included.
//                 </p>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl mb-4">💬</div>
//                 <h3 className="text-lg font-semibold text-foreground mb-2">Expert Support</h3>
//                 <p className="text-foreground/60">
//                   24/7 customer service and technical assistance.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-16 md:py-24 bg-primary text-white">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Help Choosing?</h2>
//             <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
//               Our tech experts are ready to help you find the perfect device for your needs.
//             </p>
//             <Link
//               href="/contact"
//               className="inline-flex items-center px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-all"
//             >
//               Contact Our Tech Team
//             </Link>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   )
// }
