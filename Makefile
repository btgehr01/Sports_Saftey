# In order to add more Makefile commands, add a new .PHONY word and follow the syntax of the others
.PHONY:	create delete

# Clouformation Stack MetaData Variables
STACK_NAME := eap-storage
TEMPLATE_FILE := bucket.yaml
AWS_REGION := us-east-1

# Creates AWS CLoudformation Stack from bucket.yaml
create:
	aws cloudformation create-stack \
	--stack-name $(STACK_NAME) \
	--template-body file://$(TEMPLATE_FILE) \
	--capabilities CAPABILITY_NAMED_IAM CAPABILITY_IAM	\
	--region $(AWS_REGION)

# Deletes AWS Cloudformation Stack
delete:
	aws cloudformation delete-stack --stack-name $(STACK_NAME) --region $(AWS_REGION)