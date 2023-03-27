from typing import Iterable

from sanic import Request, HTTPResponse


def _add_cors_headers(response: HTTPResponse, methods: Iterable[str]) -> None:

    allow_methods = list(set(methods))
    if "OPTIONS" not in allow_methods:
        allow_methods.append("OPTIONS")
    headers = {
        "Access-Control-Allow-Methods": ",".join(allow_methods),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": (
            "origin, content-type, accept, authorization, x-xsrf-token, x-request-id, transfer-encoding"
        ),
    }
    response.headers.extend(headers)


def add_cors_headers(request: Request, response: HTTPResponse) -> None:
    if request.method != "OPTIONS" and request.route:
        methods = [method for method in request.route.methods]
        _add_cors_headers(response, methods)
