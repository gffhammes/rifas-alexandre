/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {    
    ADMINS_MAILS: "gffhammes@gmail.com,a.d.sanches@gmail.com,contato.campos.site@gmail.com",
  }
}

module.exports = nextConfig
