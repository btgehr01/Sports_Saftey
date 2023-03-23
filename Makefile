
.PHONY:	create delete update

STACK_NAME := eap-storage

TEMPLATE_FILE := bucket.yaml

AWS_REGION := us-east-1

create:
	aws cloudformation create-stack \
	--stack-name $(STACK_NAME) \
	--template-body file://$(TEMPLATE_FILE) \
	--capabilities CAPABILITY_NAMED_IAM	\
	--region $(AWS_REGION)

delete:
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --region $(AWS_REGION)