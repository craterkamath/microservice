FROM alpine:3.7

WORKDIR /app

COPY . /app

RUN apk --update-cache \
    add musl \
        linux-headers \
	    gcc \
	        g++ \
		    make \
		        gfortran \
			    openblas-dev \
			        python3 \
				    python3-dev

RUN pip3 install --upgrade pip
RUN pip3 install numpy 'pandas<0.21.0'
RUN pip3 install -r requirements.txt

EXPOSE 80

ENV NAME users
ENV TEAM_ID CC_434_443_445_486

CMD ["python3", "app.py"]