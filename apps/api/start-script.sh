#!/bin/bash

echo "hello"
nx serve | while read -r line; do
    echo "$line"
    if [[ "$line" == *"Listening at"* ]]; then
        echo "World"
        break
    fi
done
