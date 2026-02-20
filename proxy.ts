import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 開發模式：跳過認證檢查
const DEV_MODE = process.env.NODE_ENV === 'development' || 
                 process.env.NEXT_PUBLIC_DEV_MODE === 'true'

// 需要保護的路由
const PROTECTED_ROUTES = [
  '/dashboard',
  '/properties',
  '/tenants',
  '/payments',
  '/maintenance',
  '/settings',
  '/analytics'
]

// 公開路由（不需要登入）
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/quick-login',
  '/register',
  '/test'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 檢查是否為保護路由
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  // 檢查是否為公開路由
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  // 開發模式：跳過所有認證檢查
  if (DEV_MODE) {
    console.log(`[DEV MODE] 訪問: ${pathname} - 跳過認證檢查`)
    
    // 如果是訪問首頁，重定向到快速登入頁面（方便開發測試）
    if (pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = '/quick-login'
      return NextResponse.redirect(url)
    }
    
    return NextResponse.next()
  }
  
  // 正式環境：檢查認證
  // 這裡可以添加正式的認證邏輯
  
  // 如果是公開路由，允許訪問
  if (isPublicRoute) {
    return NextResponse.next()
  }
  
  // 如果是保護路由但未登入，重定向到登入頁面
  if (isProtectedRoute) {
    // 檢查是否有登入 token（這裡是示例，實際應該檢查有效的 session）
    const authToken = request.cookies.get('auth_token')
    
    if (!authToken) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

// 設定 middleware 匹配的路由
export const config = {
  matcher: [
    /*
     * 匹配所有路徑除了：
     * 1. _next/static (靜態檔案)
     * 2. _next/image (圖片優化)
     * 3. favicon.ico (網站圖示)
     * 4. 公開檔案 (如：robots.txt)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}