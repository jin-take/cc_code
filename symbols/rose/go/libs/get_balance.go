package libs

import (
	"fmt"
)

func GetBalance() string {
	msg := "hello world!"
	fmt.Println("balance:", msg)
	
	return msg
}