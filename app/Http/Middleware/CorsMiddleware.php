<?php

namespace LacosFofos\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    private $origins = [
        'http://localhost:4200',
        'http://localhost:8100',
        'http://192.168.0.8:8100',
        'http://192.168.0.8:8101'
    ];

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $requestOrigin = $request->headers->get('Origin');

        if (in_array($requestOrigin, $this->origins)) {
            $allowOrigin = $requestOrigin;
        }

        if ($request->is('api/*')) {
            if (isset($allowOrigin)) {
                header("Access-Control-Allow-Origin: $allowOrigin");
            }

            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE');
            header('Access-Control-Expose-Headers: Authorization');
        }
        return $next($request);
    }
}
