package middleware

import (
	"net/http"
	"os"

	"github.com/clerk/clerk-sdk-go/v2"
	clerkhttp "github.com/clerk/clerk-sdk-go/v2/http"
)

func Authenticate(next http.Handler) http.Handler {
	clerk.SetKey(os.Getenv("CLERK_SECRET_KEY"))
	return clerkhttp.RequireHeaderAuthorization()(next)
}

